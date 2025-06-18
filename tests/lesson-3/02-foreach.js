//////For Each/////
//Bài 1:
const numbers = [1, 2, 3];

numbers.forEach((number) => {
    console.log(number);
});


//bài 2:
const numArray = [7, 2, 3];

let total = 0;
let max = numArray[0];
let min = numArray[0];

numArray.forEach((number) => {
    total += number;
    if (number > max) {
        max = number;
    }
    if (number < min) {
        min = number;
    }
});
console.log(`Tổng : ${total}, số bé nhất : ${min}, số lớn nhất : ${max}`)

//bài 3: tạo mảng nhân đôi
const oldArray = [5, 2, 8];
const newArray = [];

oldArray.forEach((item) => {
    newArray.push(item * 2);
});

console.log(newArray);

//