"use strict";

const userForm = new UserForm();
 
userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if(response.success == true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage("Please, enter valid data - Пожалуйста, введите действительные данные");
        }
    });
}

userForm.registerFormCallback = data => {
    console.log(data);

    ApiConnector.register(data, response => {
        if(response.success == true) {
            location.reload();
        } else {
            setRegisterErrorMessage("Registration: WHERE IS THE PASSWORD OR LOGIN??? - Регистрация: ГДЕ ПАРОЛЬ ИЛИ ЛОГИН???");
        }
    });
}