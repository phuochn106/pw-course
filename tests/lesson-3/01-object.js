//1
let student = {
    "studentName": "John",
    "grades": { "math": 9.75, "english": 10 }
}
console.log(student["grades"]["math"]);

//2
const product = {
    "pencil": 10000,
    "eraser": 5000,
    "ruler": 6000,
    "scissor": 12000
};
for (let subProduct in product) {
    console.log(subProduct + " costs " + product[subProduct] + "vnd");
}

//3
let bike = {};
bike.color = "Blue";
console.log(bike["color"]);

//4
let employee = { "name": "Lisa Teng", "age": "18" };
console.log(employee)
delete employee["age"]
console.log(employee)


//5
const school = {
    "classA": ["An", "Binh", "Chau"],
    "classB": ["Dao", "Huong", "Giang"]
}
