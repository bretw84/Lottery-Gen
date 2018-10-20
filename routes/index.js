Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

const flatten = (a, shallow, r) => {
  if(!r){ r = []}
   
if (shallow) {
  return r.concat(...a);
  }
      
   for(let i=0; i<a.length; i++){
        if(a[i].constructor == Array){
            flatten(a[i],shallow,r);
        }else{
            r.push(a[i]);
        }
    }
    return r;
};

const array_rand = require('array_rand');
const express = require('express');
const router = express.Router();
const Lottery = require('../models/lottery.js');
var winnings = 0;
/*
function printPre($data) {
	echo '<br><pre>';
	print_r($data);
	echo '</pre><br>';
}
*/

function printPre(str)
{
	return "<br><pre>"+str+"</pre><br>";
}

/*
function fixNumbers($data) {
	$megaNum = array_pop($data);
	sort($data);
	array_push($data,$megaNum);
	return $data;
}
*/

function fixNumbers(data)
{
	var megaNum = data.pop();
	data.sort();
	data.push(megaNum[0]);
	return data;
}


/*
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
*/

function getMatches(a,b)
{
	var matches = 0;

	var megaNumA = a.pop();
	var megaNumB = b.pop();
	matches = a.diff(b);

	var count = matches.length;

	matches = 5-count;

	var megaMatch = 0;

	if(megaNumA[0] == megaNumB[0])
	{
		megaMatch = 1;
	}

	//Mongo Document Insert here
	var newLottery = new Lottery(
	{
		main:matches,
		mega:megaMatch
	});

	//This is an Async Save Call.
	newLottery.save(function(err, createdLottery)
	{
		if(err)
		{
			console.log(err);
		}
	});

	return "Regular Numbers: "+matches+"<br>Mega Ball: "+megaMatch;
}

function getStats(res,retString)
{
	Lottery.find({}).exec(function(err, results)
	{
		var data;
		var count = results.length;
		var spent = count*2;
		var winnings = 0;

		results.forEach( function(element)
		{

			if(element['main'] == 0 && element['mega'] ==1)
			{
				winnings += 2;
			}else if(element['main'] == 1 && element['mega'] == 1) {
				winnings += 4;
			//2 + 1 $10
			} else if(element['main'] == 2 && element['mega'] == 1) {
				winnings += 10;
			}
			//3 + 0 $10
			else if(element['main'] == 3 && element['mega'] == 0) {
				winnings += 10;
			}
			//3 + 1 $200
			else if(element['main'] == 3 && element['mega'] == 1) {
				winnings += 200;
			}
			//4 + 0 $500
			else if(element['main'] == 4 && element['mega'] == 0) {
				winnings += 500;
			}
			//4 + 1 $10,000
			else if(element['main'] == 4 && element['mega'] == 1) {
				winnings += 10000;
			}
			//5 + 0 $1,000,000
			else if(element['main'] == 5 && element['mega'] ==1) {
				winnings +=1000000;
			}
			//5 + 1 JACKPOT $1,000,000,000
			else if(element['main'] == 5 && element['mega'] == 1) {
				winnings += 1000000000;
			}
			//bust
			else { }
			
		    data = "<br><br><strong>Stats</strong><br>You have play "+count+" times.<br>You have spent: $"+spent+"<br>You have won: $"+winnings;

			
		});
		res.render('index', { retString:retString+data, title: 'Lotto Generator' });
	});
}

/*

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
*/



/* GET home page. */
router.get('/', function(req, res, next) {

	//create array of main number 1-70
	//$numbers = range(1,70);
	var numbers = [...Array(71).keys()];

	//create array of mega ball number 1-25
	//$mega = range(1,25);
	var mega = [...Array(26).keys()];

	//initialize winning numbers array
	//$winning = array();
	var winning = [];


	//initialize your numbers array
	//$yours = array();
	var yours = [];

	//get 5 winning numbers and add to winning array
	/*
	for($i=1; $i <= 5; $i++) {
		array_push($winning, array_rand($numbers)+1);
	}
	*/
	for(var i=0; i <= 5; i++)
	{
		winning.push(array_rand.getRandomObjectsInRangeSync(numbers,1,1,70)[0]);
	}
	//get winning mega ball number
	//array_push($winning, array_rand($mega)+1);
	winning.push(array_rand.getRandomObjectsInRangeSync(mega,1,1,25));

	//get 6 picked numbers and add to your array
	/*
	for($i=1; $i <= 5; $i++) {
		array_push($yours, array_rand($numbers)+1);
	}
	*/
	for(var i=1; i <= 5; i++)
	{
		yours.push(array_rand.getRandomObjectsInRangeSync(numbers,1,1,70)[0]);
	}


	//get your mega ball number
	//array_push($yours, array_rand($mega)+1);
	yours.push(array_rand.getRandomObjectsInRangeSync(mega,1,1,25));

	//echo "<strong>Winning Numbers</strong>";
	var retString = "<strong>Winning Numbers</strong>";
	//$winning = fixNumbers($winning);
	winning = fixNumbers(winning);
	//printPre($winning);
	retString += printPre(winning);

	//echo "<strong>Your Numbers</strong>";
	retString += "<strong>Your Numbers</strong>";
	
	//$yours = fixNumbers($yours);
	yours = fixNumbers(yours);

	//printPre($yours);
	retString += printPre(yours);

	//echo "<strong>Results</strong><br>";
	retString += "<strong>Results</strong><br>";

	results = getMatches(winning, yours);

	//echo "<br><br><button onclick='location.reload()'>Play!</button>";
	retString += "<br><br><button onclick='location.reload()'>Play!</button><br>";

  	getStats(res, retString);
});

module.exports = router;
