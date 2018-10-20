# Lottery-Gen
Mega Millions Easy Pick Generator with stats.

Threw this together really fast this morning. Made random series of 5 numbers 1-70 nad a 6th number 1-25 for a quick pick and winning numbers and compare. Wanting to see how many time i have to click the button before i win a substantial amount of money and get ahead.

It requires a mysql database called lotto_gen and 1 table called results with 3 columns
id INT Auto Increment Primary index
main INT 1
mega INT 1

connection to database is in 2 places in functions file - I am aware of how awful this is - its not permanent was just getting it up and getting data on my xampp
