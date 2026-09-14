// let Name = "Иван Иванов";

// let isStudent = Name === "Иван Иванов";

// let age = "18";
// let currentYear = "2026";

// let birthYear = currentYear - age;

// console.log(Name);
// console.log(birthYear);

// console.log(`Меня зовут ${Name}, мне ${age} лет. Я ученик курса: ${isStudent}`);

// let a = "123";
// let b = +"456";
// let c = Number("789");
// let d = Boolean("0");
// let e = Boolean(" ");
// let result = a + b + c + d + e;

// console.log(result);


let number = 1;

if (number % 2 === 0) {
  console.log("Чётное");
} else {
  console.log("Нечётное");
}
let age2 = 19;
let discount = age2 > 65 ? 30 : age2 > 18 ? 20 : 10;
console.log(discount);

let login = prompt("Введите имя пользователя:");
let password = prompt("Введите пароль:");

if ((login === "admin" || login === "user") && password === "123456") {
  console.log("Доступ разрешён");
} else {
  console.log("Доступ запрещён");
}
