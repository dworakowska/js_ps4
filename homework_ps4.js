// 1. Extend String type with the reverse() function. The function is to reverse the value of the string on 
// which it was called.


String.prototype.odwroc = function () {
    return this.split("").reverse().join("");
}

let person = "Patrycja Dworakowska";
console.log(typeof (person));
let odwrocone = person.odwroc();
console.log(odwrocone);


// 2. Extend Number type with the reverse() function. The function is to reverse the value of the Number on 
// which it was called.


Number.prototype.reverse = function () {
    return Number(String(this).odwroc())
}

let a = (1234).reverse();
console.log(typeof (a))


//////////

String.prototype.isValid = function () {
    return this.length > 5 && this.length < 10;
}

let imie = "Lukasz"
let nazwsiko = "Dworakowski"

console.log(imie.isValid())
console.log(nazwsiko.isValid())