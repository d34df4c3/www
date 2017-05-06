<?php

	$data = file_get_contents(urldecode($_GET['url']));
	if ($data)
		echo $data;
	else
		echo $http_response_header[0];	

?>