<?php

include_once('Callback.class.php');

class DiskFileSystemCallback extends Callback
{
    function __construct($monthPath)
    {
        $this->mountPath = $monthPath;
        $this->isMounted = false;
        $this->totalSpace = 0;
        $this->usedSpace = 0;
        $this->freeSpace = 0;
    }

    public function run($event, $data)
    {
        $this->refresh();
        return array
        (
            "isMounted" => $this->isMounted,
            "totalSpace" => $this->totalSpace,
            "usedSpace" => $this->usedSpace,
            "freeSpace" => $this->freeSpace
        );
    }

    /* Private */
    private $mountPath;
    private $isMounted;
    private $totalSpace;
    private $usedSpace;
    private $freeSpace;

    private function refresh()
    {
        $output = array();
        $status = -1;
        // is disk mounted ?
        exec('cat /proc/mounts | grep '. escapeshellarg($this->mountPath), $output, $status);
        $this->isMounted = ($status == 0 && count($output) != 0);

        if (!$this->isMounted)
            return;

        // get sizes
        $output = array();
        exec('df -k | grep '. escapeshellarg($this->mountPath), $output);
        $data = preg_split('/\s+/', $output[0]);
        $this->totalSpace = (int)$data[1];
        $this->usedSpace = (int)$data[2];
        $this->freeSpace = (int)$data[3];
    }
}

?>
