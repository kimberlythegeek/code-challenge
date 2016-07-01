<?php
$page = $_GET['page'];
//if(empty($page)) { $page = 1; }
$offset = (((int)$page - 1) * 10);

/* proxy.php */
$url = "http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&noOfReviews=10&internal=1&yelp=1&google=1&offset=" . (string)$offset . "&threshold=1";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec ($ch);
curl_close ($ch);
echo $result;
?>
