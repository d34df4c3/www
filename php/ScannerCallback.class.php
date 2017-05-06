<?php
 
class ScannerCallback extends Callback
{
    function __construct($path)
    {
        $this->path = $path;
    }
    
    public function run($event, $data)
    {
        return array
        (
            "numPendingDocuments" => $this->numFiles($this->path)
        );
    }

    /* PRIVATE */
    private function numFiles($directory)
    {
        $iter = new FilesystemIterator($directory, FilesystemIterator::SKIP_DOTS);
        return iterator_count($iter);
    }
}

?>