<?php

include_once('Callback.class.php');

class HubicCallback extends Callback
{
    function __construct($hubicPath)
    {
        $this->hubicPath = $hubicPath;
        $this->state = false;
        $this->account = '';
        $this->syncDirectory = '';
        $this->totalSpace = 0;
        $this->usedSpace = 0;
        $this->freeSpace = 0;
    }
    
    public function run($event, $data)
    {
        $this->refresh();
        return array
        (
            "state" => $this->state,
            "account" => $this->account,
            "syncDirectory" => $this->syncDirectory,
            "totalSpace" => $this->totalSpace,
            "usedSpace" => $this->usedSpace,
            "freeSpace" => $this->freeSpace,
            "backups" => $this->backups
        );
    }
    
    /* Private */
    private $hubicPath;
    private $state;
    private $account;
    private $syncDirectory;
    private $lastSync;
    private $totalSpace;
    private $usedSpace;
    private $freeSpace;
    private $backups = array();
    
    private function refresh()
    {
        $this->refreshStatus();
        $this->refreshBackupStatus();
    }
    
    private function refreshStatus()
    {
        $output = array();
        $status = -1;
        // get status ?

        exec('cat '. escapeshellarg($this->hubicPath .'status'), $output, $status);
        if ($status != 0)
        {
            $this->state = 'StatusFileNotFound';
            return;
        }

        $this->lastSync = DateTime::createFromFormat('Y-m-d H:i:s', $output[0]);
        if (time() - $this->lastSync->getTimestamp() > 300)
        {
           $this->state = 'NotRunning';
           return;
        }

        foreach ($output as $line)
        {
            if ($this->startsWith($line, "State: "))
                $this->state = substr($line, strlen("State: "));
            else if ($this->startsWith($line, "Account: "))
                $this->account = substr($line, strlen("Account: "));
            else if ($this->startsWith($line, "Synchronized directory: "))
                $this->syncDirectory = substr($line, strlen("Synchronized directory: "));
            else if ($this->startsWith($line, "Usage: "))
            {
                $usage = substr($line, strlen("Usage: "));
                list($used, $total) = explode('/', $usage, 2);
                $this->usedSpace = (float)$this->convertToByte($used);
                $this->totalSpace = (float)$this->convertToByte($total);
                $this->freeSpace = $this->totalSpace - $this->usedSpace;
            }
        }
    }
    
    private function refreshBackupStatus()
    {
        $output = array();
        $status = -1;
        // get status ?

        exec('cat '. escapeshellarg($this->hubicPath .'backup-info'), $output, $status);
        if ($status <> 0)
            return;
        
        $backupUsedSpace = 0;
        foreach($output as $index => $line)
        {
            if ($index < 2)
                continue;

            $data = preg_split('/\s+/', $line, 0, PREG_SPLIT_NO_EMPTY);
            
            $lastBackup = false;
            $size = 0;
            if ($data[3] != "-")
            {
                $lastBackup = DateTime::createFromFormat('m/d/Y H:i', $data[3].' '.$data[4])->getTimestamp();
                $size = $this->convertToByte($data[5].' '.$data[6]);
            }
            else
            {
                $size = $this->convertToByte($data[4].' '.$data[5]);
            }
            
            $this->backups[] = array
            (
                "name" => $data[0],
                "isAttached" => ($data[1] == "Yes"),
                "localPath" => $data[2],
                "lastBackup" => $lastBackup,
                "size" => $size
            );
            
            $backupUsedSpace += $size;
        }

        $this->backups[] = array
        (
            "name" => "Synchronized",
            "isAttached" => ($this->state == "Idle" || $this->state == "Busy"),
            "localPath" => $this->syncDirectory,
            "lastBackup" => $this->lastSync->getTimestamp(),
            "size" => $this->usedSpace - $backupUsedSpace
        );
    }
    
    private function startsWith($txt, $pattern)
    {
        // search backwards starting from txt length characters from the end
        return $pattern === "" || strrpos($txt, $pattern, -strlen($txt)) !== FALSE;
    }
    
    private function convertToByte($txt)
    {
        list($value, $unit) = explode(' ', $txt, 2);
        switch ($unit)
        {
            case 'GB': return (float)$value;
            case 'MB': return (float)$value / 1024;
        }
        return $value;
    }
}

?>