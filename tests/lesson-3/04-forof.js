//Bài 1 : in nghịch đảo
const label = "Playwright";
const newArray = [];

for (const letter of label) {
    newArray.unshift(letter);
}
console.log(newArray);

//Bài 2 : phần tử xuất hiện 1 lần
const originalArray = [1, 2, 3, 1, 2, 4, 5];
const result = [];

for (let item of originalArray) {
    let count = 0;

    // Đếm số lần xuất hiện của item trong arr
    for (let value of originalArray) {
        if (value === item) {
            count++;
        }
    }

    if (count === 1) {
        result.push(item);
    }
}

console.log(result); 