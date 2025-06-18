//Bài 1: Tính tổng từ 1-> 100

let sum = 0;
for (let i = 1; i <= 100; i++) {
    sum += i;
}
console.log("Tổng từ 1 đến 100 là:", sum);


//Bài 2: In bảng cưu chương
for (let i = 2; i <= 9; i++) {
    console.log(`\n Bảng cửu chương ${i}:`);
    for (let j = 1; j <= 10; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}

//Bài 3 : Dãy số lẻ từ 1-> 99
const oddNumbers = [];

for (let i = 1; i <= 99; i++) {
    if (i % 2 !== 0) {
        oddNumbers.push(i);
    }
}
console.log(oddNumbers);

//bài 4: Tính tổng doanh thu:
const revenues = [
    { month: 1, total: 120 },
    { month: 2, total: 100 },
    { month: 3, total: 150 },
    { month: 4, total: 90 },
    { month: 5, total: 200 },
    { month: 6, total: 180 },
    { month: 7, total: 130 },
    { month: 8, total: 170 },
    { month: 9, total: 160 },
    { month: 10, total: 140 },
    { month: 11, total: 190 },
    { month: 12, total: 110 },
];

let totalRevenue = 0;
for (let record of revenues) {
    totalRevenue += record["total"];
}

console.log("Doanh thu cả năm:", totalRevenue);

///////for in///////
//bài 1: in các thuộc tính của object
const student = { name: "Alex", age: 10 };

for (const item in student) {
    console.log(`${item}=${student[item]}`);
}

//Bài 2: Tính tổng giá trị số: 
const pupil = {
    name: "Alex",
    age: 10,
    salary: 20
};

let totalNumber = 0;

for (const item in pupil) {
    if (typeof pupil[item] === 'number') {
        totalNumber += pupil[item];
    }
}

console.log("Tổng các giá trj số : ", totalNumber);


//Bài 3: Lấy thuộc tính đưa vào mảng mới
const aBoy = {
    name: "Alex",
    age: 10
};

const properties = [];

for (const pro in aBoy) {
    properties.push(pro);
}

console.log(properties);

//Bài 4 : 