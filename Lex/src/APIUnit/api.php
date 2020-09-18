<?php

for ($i=0; $i < 100; $i++) {
    $ch = curl_init();
    curl_setopt($ch , CURLOPT_URL , "http://localhost:8080/hello3/111");
    curl_setopt($ch, CURLOPT_USERAGENT, "Test");
    $result = curl_exec($ch);
    curl_close($ch);
}

?>