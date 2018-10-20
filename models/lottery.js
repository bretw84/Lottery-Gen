var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lotterySchema = new Schema({

  dateCreated: 
  { 
    type: Date, 
    default: Date.now 
  },
  main: Array,
  mega: Number
});

var Lottery = mongoose.model('Lottery', lotterySchema);

console.log("Model:Lottery, Loaded");
module.exports = Lottery;