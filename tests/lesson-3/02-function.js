//1. Tính BMI

function calculateBMI(height, weight) {
    let BMI = weight / (height * height)
    if (BMI < 18.5) {
        console.log("BMI = Thieu can");
    } else if (BMI >= 18.5 && BMI < 25) {
        console.log("Binh thuong");
    }
    else if (BMI >= 25 && BMI < 30) {
        console.log("Thua can");
    }
    else if (BMI >= 30) {
        console.log("Beo phi");
    }
}

calculateBMI(1.53, 120);



//2 Chuyển đổi nhiệt độ

function convertTemp(tempValue, tempType) {
    let convertValue = 0;
    if (tempType == "C") {
        convertTemp = tempValue * 9 / 5 + 32;
        console.log(`${tempValue} do C tuong ung voi ${convertTemp} do F`)
    } else if (tempType == "F") {
        convertTemp = (tempValue - 32) * 5 / 9;
        console.log(`${tempValue} do F tuong ung voi ${convertTemp} do C`)
    } else {
        console.log("Chi nhan gia tri C hoac F");
    }
}

convertTemp(86, "F")



//3 - Tìm số nguyên tố

function filterPrimeNumber(numberArray) {
    let primeNumber = [];
    for (i = 0; i < numberArray.length; i++) {
        if (numberArray[i] == 0 || numberArray[i] == 1 || numberArray[i] == 2) {
            primeNumber.push(numberArray[i])
            continue;
        }
        for (j = 2; j <= numberArray[i] - 1; j++) {
            if (numberArray[i] % j == 0) {
                break;
            } else {
                if (j === numberArray[i] - 1) {
                    primeNumber.push(numberArray[i])
                }
            }

        }
    }
    if (primeNumber.length > 0) {
        console.log("Các số nguyên tố trong mảng là: " + primeNumber)
    } else {
        console.log("Mảng đã cho ko có số nguyên tố nào!!")
    }
}

arrayOfNumber = [0, 1, 2, 3, 5, 15, 19]
filterPrimeNumber(arrayOfNumber)

//4 Change email
const staffArray = [
    { "name": "John", "email": "john@mail.com" },
    { "name": "Luna", "email": "luna@mail.com" },
    { "name": "Ann", "email": "ann@mail.com" }
]

function changeEmail(name, newEmail) {
    for (i = 0; i < staffArray.length; i++) {
        if (staffArray[i]["name"] == name) {
            staffArray[i]["email"] = newEmail;
            console.log(staffArray[i])
        }
    }
    console.log(staffArray)
}

changeEmail("Luna", "offboard@mail.com")

//5 : Tinh diem trung binh cua sinh vien
const students = [
    { "name": "Tung", score: 85 },
    { "name": "Cuc", score: 90 },
    { "name": "Truc", score: 75 },
    { "name": "Truc", score: 100 }
]

function calculateAverageMark(studentArr) {
    let sumMark = 0;

    for (let value of studentArr) {
        sumMark += value["score"];
    }
    console.log("Diem trung binh cua cac sinh vien la : " + sumMark / studentArr.length)
}

calculateAverageMark(students);


// 6 : Gia ve vao cong

function printTicketCost(age) {
    if (age <= 5) {
        console.log("Mien phi");
    } else if (age >= 6 && age <= 17) {
        console.log("50K");
    }
    else if (age >= 18) {
        console.log("100K");
    }
}
printTicketCost(20);

//7. In ten thang:
function printMonth(month) {
    switch (month) {
        case 1: console.log("Thang 1");
            break;
        case 1: console.log("Thang 1");
            break;
        case 2: console.log("Thang 2");
            break;
        case 3: console.log("Thang 3");
            break;
        case 4: console.log("Thang 4");
            break;
        case 5: console.log("Thang 5");
            break;
        case 6: console.log("Thang 6");
            break;
        case 7: console.log("Thang 7");
            break;
        case 8: console.log("Thang 8");
            break;
        case 9: console.log("Thang 9");
            break;
        case 10: console.log("Thang 10");
            break;
        case 11: console.log("Thang 11");
            break;
        case 12: console.log("Thang 12");
            break;
        default: console.log("Invalid month");
    }
}
printMonth(1)

//8 Kiem tra nhiet do

function kiemTraThoiTiet(nhietDo) {
    if (nhietDo >= 30) {
        console.log("Thời tiết: Nóng");
    } else if (nhietDo >= 20) {
        console.log("Thời tiết: Mát");
    } else {
        console.log("Thời tiết: Lạnh");
    }
}

kiemTraThoiTiet(35);
