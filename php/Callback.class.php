<?php

abstract class Callback
{
    abstract public function run($event, $data);
}

class CompositeCallback extends Callback
{
    var $callbacks = array();
   
    public function addCallback($event, $callback)
    {
        if (!is_subclass_of($callback, "Callback"))
            return;
 
        if (!isset($this->callbacks[$event]))
            $this->callbacks[$event] = array();
 
        $this->callbacks[$event][] = $callback;
    }
 
    public function run($event, $data)
    {
        if (!isset($this->callbacks[$event]))
            return array();
 
        $result = array();
        foreach ($this->callbacks[$event] as $callback)
        {
            $result = array_merge($callback->run($event, $data), $result);
        }
        return $result;
    }
}

?>