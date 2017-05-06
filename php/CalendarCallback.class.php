<?php
 
class CalendarCallback extends Callback
{
    function __construct($databaseFile)
    {
        $this->dbFile = $databaseFile;
    }
    
    public function run($event, $data)
    {
        $this->dbEngine = new SQLite3($this->dbFile);
        
        if ($this->dbEngine->lastErrorCode())
          return array("error" => $this->dbEngine->lastErrorMsg());

        $this->dbEngine->query('PRAGMA encoding = "UTF-8"');
        $this->refresh();
        $this->dbEngine->close();

        return Array("events" => $this->events);
    }

    /* PRIVATE */
    private $dbEngine = null;
    private $events = array();

    private function refresh()
    {
        $result = $this->dbEngine->query
        (
            "SELECT
                S.name                                      AS type,
                CAST(strftime('%s', W.w_date) AS INTEGER)   AS date,
                strftime('%H:%M', W.w_time)                 AS time,
                W.shortDescription                          AS title,
                W.longDescription                           AS description,
                W.u_id                                      AS user_id,
                W.is_objectif                               AS isObjectif,
                W.is_done                                   AS isDone
            FROM
                WORKOUT W,
                SPORT S
            WHERE 1 = 1
                AND W.s_id = S.s_id
                AND w_date >= date()
                AND w_date < date('now', '+1 month')
            ORDER BY w_date ASC, w_time ASC"
        );

        while ($data = $result->fetchArray(SQLITE3_ASSOC))
            $this->events[] = $data;
    }
}

?>