<?php

//get helper functions
require('functions.php');

//create array of main number 1-70
$numbers = range(1,70);

//create array of mega ball number 1-25
$mega = range(1,25);

//initialize winning numbers array
$winning = array();

//initialize your numbers array
$yours = array();

//get 5 winning numbers and add to winning array
for($i=1; $i <= 5; $i++) {
	array_push($winning, array_rand($numbers)+1);
}

//get winning mega ball number
array_push($winning, array_rand($mega)+1);

//get 6 picked numbers and add to your array
for($i=1; $i <= 5; $i++) {
	array_push($yours, array_rand($numbers)+1);
}

//get your mega ball number
array_push($yours, array_rand($mega)+1);

echo "<strong>Winning Numbers</strong>";
$winning = fixNumbers($winning);
printPre($winning);

echo "<strong>Your Numbers</strong>";
$yours = fixNumbers($yours);
printPre($yours);

echo "<strong>Results</strong><br>";

echo $results = getMatches($winning, $yours);

echo "<br><br><button onclick='location.reload()'>Play!</button>";

echo getStats();

?>