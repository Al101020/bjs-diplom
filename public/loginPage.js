// 2023.05.18 -----------------------------------------------------------------------------------------------------

//1. Подключите строгий режим выполнения кода.
"use strict";

//2. Создайте объект класса UserForm.
const userForm = new UserForm();

//3. Присвойте свойству loginFormCallback созданного объекта значение функции, которая в качестве аргумента принимает объект data (объект, 
//   который содержит логин и пароль, введённые в форму, и который будет передаваться внутри loginFormAction). 
userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if(response.success == true) {
            location.reload();
        } else {
            throw new Error("Неправильно введён пароль или логин");
        }
    });
}

//4. Проделайте аналогичные действия со свойством registerFormCallback
userForm.registerFormCallback = data => {
    console.log(data);

    ApiConnector.register(data, response => {
        if(response.success == true) {
            location.reload();
        } else {
            throw new Error("Регистрация - ГДЕ ПАРОЛЬ ИЛИ ЛОГИН???");
        }
    });
}

