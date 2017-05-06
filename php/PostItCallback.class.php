<?php

include_once('Callback.class.php');

class PostItCallback extends Callback
{
    function __construct($dbFile)
    {
        $this->dbFile = $dbFile;
    }
    
    public function run($event, $data)
    {
        $this->dbHandler = new SQLite3($this->dbFile, SQLITE3_OPEN_READWRITE);
        if ($this->dbHandler->lastErrorCode())
        {
          echo 'PostItCallback::run -'. $this->dbHandler->lastErrorMsg();
          return;
        }

        if (!isset($data['action']))
            $data['action'] = 'GET';

        $result = array();
        switch ($data['action'])
        {
            case 'GET':
                $result = $this->getPostIts();
                break;
            case 'COMPLETE':
                $this->complete($data['id'], $data['value']);
                $result = $this->getPostIts();
                break;
            case 'UPDATE':
                $this->update($data['id'], $data);
                $result = $this->getPostIts();
                break;
            case 'INSERT':
                $this->insert($data);
                $result = $this->getPostIts();
                break;
        }

        $this->dbHandler->close();
        return $result;
    }
    
    /* Private */
    private $dbFile;
    private $dbHandler;
    
    private function getPostIts()
    {
        $query =
            "SELECT
                ROWID               AS id,
                MESSAGE             AS message,
                PRIORITY            AS priority,
                YN_COMPLETE         AS isCompleted,
                CREATION_DATE       AS creationDate,
                DUE_DATE            AS dueDate,
                COMPLETION_DATE     AS completionDate
            FROM POSTIT
            WHERE YN_COMPLETE = 'N'
                OR (YN_COMPLETE = 'Y' AND  STRFTIME('%s',CURRENT_TIMESTAMP) - COMPLETION_DATE < 3600 * 24)
            ORDER BY
                CASE YN_COMPLETE
                    WHEN 'N' THEN 0
                    ELSE 1
                END ASC,
                CASE PRIORITY
                    WHEN 'HIGH' THEN 0
                    WHEN 'NORMAL' THEN 1
                    ELSE 2
                END ASC,
                DUE_DATE ASC";
        $res = $this->dbHandler->query($query);
        $result = array();
        while ($data = $res->fetchArray(SQLITE3_ASSOC))
        {
            $data['isCompleted'] = $data['isCompleted'] == 'Y';
            $data['message'] = htmlspecialchars_decode($data['message'], ENT_QUOTES);
            $result[] = $data;
        }
        return array('postits' => $result);
    }
    
    private function complete($id, $isCompleted)
    {
        $query =
            "UPDATE POSTIT
             SET
                YN_COMPLETE = '". ($isCompleted ? 'Y' : 'N') ."',
                COMPLETION_DATE = ". ($isCompleted ? "STRFTIME('%s', DATETIME('NOW'))" : "NULL") ."
             WHERE ROWID = '". $id ."'";

        $this->dbHandler->query($query);
    }
    
    private function update($id, $data)
    {
        $query =
            "UPDATE POSTIT
             SET
                YN_COMPLETE = '". ($data['isCompleted'] ? 'Y' : 'N') ."',
                COMPLETION_DATE = ". ($data['isCompleted'] ? "STRFTIME('%s', DATETIME('NOW'))" : "NULL") .",
                PRIORITY = '". $data['priority'] ."',
                MESSAGE = '". htmlspecialchars($data['message'], ENT_QUOTES) ."',
                DUE_DATE = '". $data['dueDate'] ."'
             WHERE ROWID = ". $id;

        $this->dbHandler->query($query);
    }

    private function insert($data)
    {
        $query =
            "INSERT INTO POSTIT (PRIORITY, MESSAGE, DUE_DATE)
             VALUES ('". $data['priority'] ."', '". htmlspecialchars($data['message'], ENT_QUOTES) ."', '". $data['dueDate'] ."')";

        $this->dbHandler->query($query);
    }
}

?>