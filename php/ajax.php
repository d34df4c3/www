<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

include_once('common.php');

include_once('Callback.class.php');
include_once('DiskFileSystemCallback.class.php');
include_once('HubicCallback.class.php');
include_once('ScannerCallback.class.php');
include_once('CalendarCallback.class.php');
include_once('PostItCallback.class.php');

setConfig('CALLBACKS', new CompositeCallback);
getConfig('CALLBACKS')->addCallback("DFS-Chronoscaphe", new DiskFileSystemCallback('/media/Chronoscaphe'));
getConfig('CALLBACKS')->addCallback("DFS-Nathalie", new DiskFileSystemCallback('/media/Nathalie'));
getConfig('CALLBACKS')->addCallback("Hubic", new HubicCallback('/home/pi/Program/HubiC/'));
getConfig('CALLBACKS')->addCallback("Scanner", new ScannerCallback('/media/Chronoscaphe/Synchronized/Scanner/'));
getConfig('CALLBACKS')->addCallback("Calendar", new CalendarCallback('/home/pi/Database/Sport/Sport.db'));
getConfig('CALLBACKS')->addCallback("PostIt", new PostItCallback('/home/pi/Database/PostIt/PostIt.db'));

$result = array();

if (isset($_POST['data']))
{
    $requests = json_decode(urldecode($_POST['data']), true);
    foreach ($requests as $req)
        $result[] = getConfig('CALLBACKS')->run($req['model'], $req['args']);
}

echo json_encode($result);

?>
