<?php
header('Access-Control-Allow-Origin: *'); // Adjust this header as needed for your security requirements
$feedUrl = 'https://binauralsubliminal.000webhostapp.com/binsub_tracks/album_00/binsub_album_00.xml';
echo file_get_contents($feedUrl);
?>
