const moment = require('moment');

// //jan 1 1970 00:00:00 am
//
// var date= new Date();
// var months=["Jan","Feb"]
// console.log(date.getMonth());

// moment.locale("tr");
// var date = moment();
// date.add(1, "year").subtract(9, "months");
// console.log(date.format("DD MMMM YYYY"));

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt=1234;
moment.locale("tr");
var date = moment(createdAt);
console.log(date.format("h:mm a"));
