<style>
	.numbers {
		padding:10px;
		text-align:center;
		background:#DDDDDD;
		border: 1px solid #000000;
		border-radius:50px;
		display:inline-block;
		width:40px;
		height:40px;
		margin:10px;
		font-size:36px;
	}
	h2,h3 {margin-bottom:5px;}

	#winning .numbers:last-child,
	#yours .numbers:last-child {background:yellow;}

	table {font-size:18px;}

	fieldset {display:inline-block;}

	legend {font-size:24px; font-weight:bold;}

</style>
<?php

// echo '<meta http-equiv="refresh" content=".25">';

//get helper functions
require('functions.php');

//create array of main number 1-70
$numbers = range(1,70);

//create array of mega ball number 1-25
$mega = range(1,25);

//initialize winning numbers array
$winning = array();

//initialize your numbers array
$yours = array(3,13,21,56,69,7);

//get 5 winning numbers and add to winning array
for($i=1; $i <= 5; $i++) {
	array_push($winning, array_rand($numbers)+1);
}

//get winning mega ball number
array_push($winning, array_rand($mega)+1);

//get 6 picked numbers and add to your array
// for($i=1; $i <= 5; $i++) {
// 	array_push($yours, array_rand($numbers)+1);
// }

// //get your mega ball number
// array_push($yours, array_rand($mega)+1);

//winning numbers
echo "<fieldset>";

echo "<legend>Winning Numbers</legend>";

$winning = fixNumbers($winning);

echo "<div id='winning'>";

foreach($winning as $k => $v) {
	echo "<div class='numbers'>".$v."</div>";
}

echo "</div>";

echo "</fieldset><br><br>";

//your numbers
echo "<fieldset>";

echo "<legend>Your Numbers</legend>";

$yours = fixNumbers($yours);

echo "<div id='yours'>";

foreach($yours as $k => $v) {
	echo "<div class='numbers'>".$v."</div>";
}

echo"</div>";

echo "</fieldset>";

echo "<h2>Results</h2>";

echo $results = getMatches($winning, $yours);

echo "<br><br><button onclick='location.reload()'>Play!</button>";

echo getStats();

?>