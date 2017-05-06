<?php

function setConfig($key, $value)
{
    $GLOBALS['CONFIG_'. $key] = $value;
}

function getConfig($key)
{
    if (isset($GLOBALS['CONFIG_'. $key]))
        return $GLOBALS['CONFIG_'. $key];
}

?>