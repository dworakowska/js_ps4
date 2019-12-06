// // // // 1. Extend String type with the reverse() function. The function is to reverse the value of the string on
// // // // which it was called.

// String.prototype.odwroc = function() {
//   return this.split("")
//     .reverse()
//     .join("");
// };

// // let person = "Patrycja Dworakowska";
// // console.log(typeof person);
// // let odwrocone = person.odwroc();
// // console.log(odwrocone);

// // // // 2. Extend Number type with the reverse() function. The function is to reverse the value of the Number on
// // // // which it was called.

// Number.prototype.reverse = function() {
//   return Number(String(this).odwroc());
// };

// let a = 1234;
// console.log(typeof a);
// let odwrocone1 = a.reverse();
// console.log(odwrocone1);

// 3. Based on included JSON file.
// a. Create a function that will return Json from the file. a
// b. Create a structures to hold data from the file. b
// c. Map data from function a to structure from b.
// d. Create object that will give us data about:
// i. How much money was spend in 2014
// ii. What company was earning how much
// iii. What type on transaction was having what spending’s.
// iv. Values of the spending in each month
// v. Values of the spending in each day of the week

// a.
const fs = require("fs");

let info = fileName => {
  let data = fs.readFileSync(fileName);
  return JSON.parse(data);
};

// b.
function Payment(index, id, cost, type, company, date) {
  this.index = index;
  this.id = id;
  this.cost = Number(cost);
  this.type = type;
  this.company = company;
  this.date = new Date(date);
}

// c.
let json = info("data.json");
let payments = json.map(e => {
  return new Payment(
    e.index,
    e.id,
    e.cost,
    e.detailsOfPayent.Type,
    e.detailsOfPayent.company,
    e.detailsOfPayent.date
  );
});
console.log(payments);

// d. i.

let array = payments.filter(p => p.date.getFullYear() == 2014);
let sum = array.reduce((total, element) => {
  return total + element.cost;
}, 0);
console.log(sum);

// d. ii
let companies = payments.map(i => i.company);
let unique = Array.from(new Set(companies));

unique.forEach(company => {
  let array = payments.filter(p => p.company == company);
  let sum = array.reduce((total, element) => {
    return total + element.cost;
  }, 0);
  console.log(company, sum);
});

// d. iii

let type = payments.map(i => i.type);
let unique1 = Array.from(new Set(type)).sort();

unique1.forEach(type => {
  let array = payments.filter(i => i.type == type);
  let sum = array.reduce((total, element) => {
    return total + element.cost;
  }, 0);
  console.log(type, sum);
});

// d. iv
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
Date.prototype.getMonthName = function() {
  return this.toLocaleString("en", { month: "long" });
};

let month = payments.map(i => i.date.getMonthName());
let unique2 = Array.from(new Set(month));

unique2.forEach(month => {
  let array = payments.filter(i => i.date.getMonthName() == month);
  let sum = array.reduce((total, element) => {
    return total + element.cost;
  }, 0);
  console.log(month, sum);
});
console.log("\n");

// d. v

Date.prototype.getDayName = function() {
  return this.toLocaleString("en", { weekday: "long" });
};

let getDayOfWeek = function(index) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ][index];
};

let weekDay = payments.map(i => i.date.getDay());
let unique3 = Array.from(new Set(weekDay)).sort();

unique3.forEach(weekDay => {
  let array = payments.filter(i => i.date.getDay() == weekDay);
  let sum = array.reduce((total, element) => {
    return total + element.cost;
  }, 0);
  console.log(getDayOfWeek(weekDay), sum);
});
