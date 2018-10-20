<?php

function printPre($data) {
	echo '<br><pre>';
	print_r($data);
	echo '</pre><br>';
}

function fixNumbers($data) {
	$megaNum = array_pop($data);
	sort($data);
	array_push($data,$megaNum);
	return $data;
}

function getMatches($a,$b) {

	$matches = 0;

	$megaNumA = array_pop($a);
	$megaNumB = array_pop($b);

	$matches = array_diff($a,$b);

	$count = count($matches);

	$matches = 5-$count;

	$megaMatch = 0;

	if($megaNumA == $megaNumB) {
		$megaMatch = 1;
	}

	$dbc = mysqli_connect('localhost','root','','lotto_gen');

	$query = "INSERT INTO results (main, mega) VALUES ($matches, $megaMatch)";
	$dbc->query($query);

	return "Regular Numbers: ".$matches."<br>Mega Ball: ".$megaMatch;

}

function getStats() {

	$dbc = mysqli_connect('localhost','root','','lotto_gen');
	$query = "SELECT * FROM results";
	$result = $dbc->query($query);

	$count = $result->num_rows;

	$spent = $count*2;

	$winnings = 0;

	while($row = $result->fetch_assoc()) {

		$mega = $row['mega'];
		$main = $row['main'];

		//0 + 1 $2
		if($main == 0 && $mega == 1) {
			$winnings = $winnings + 2;
		//1 + 1 $4
		} elseif($main == 1 && $mega == 1) {
			$winnings = $winnings + 4;
		//2 + 1 $10
		} elseif($main == 2 && $mega == 1) {
			$winnings = $winnings + 10;
		}
		//3 + 0 $10
		elseif($main == 3 && $mega == 0) {
			$winnings = $winnings + 10;
		}
		//3 + 1 $200
		elseif($main == 3 && $mega == 1) {
			$winnings = $winnings + 200;
		}
		//4 + 0 $500
		elseif($main == 4 && $mega == 0) {
			$winnings = $winnings + 500;
		}
		//4 + 1 $10,000
		elseif($main == 4 && $mega == 1) {
			$winnings = $winnings + 10000;
		}
		//5 + 0 $1,000,000
		elseif($main == 5 && $mega ==1) {
			$winnings = $winnings + 1000000;
		}
		//5 + 1 JACKPOT $1,000,000,000
		elseif($main == 5 && $mega == 1) {
			$winnings = $winnings + 1000000000;
		}
		//bust
		else {
			$winnings = $winnings;
		}

	}

	$data = "<br><br><strong>Stats</strong><br>You have play ".$count." times.<br>You have spent: $".$spent."<br>You have won: $".$winnings;

	return $data;

}

?>