// 2023.05.18 -----------------------------------------------------------------------------------------------------
// 1. Выход из личного кабинета
// Создайте объект класса LogoutButton. В свойство action запишите функцию, которая будет вызывать запрос деавторизации (logout). В колбек запроса добавьте проверку: если запрос выполнился успешно, то обновите страницу (с помощью location.reload();).
const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if(response.success == true){
            location.reload();
        }
    });
}
// 2. Получение информации о пользователе
// Выполните запрос на получение текущего пользователя (current), в колбеке которого проверьте ответ: если ответ успешный, то вызовите метод отображения данных профиля (ProfileWidget.showProfile) в который передавайте данные ответа от сервера.
// ApiConnector.current(response => console.log(response.data));

ApiConnector.current(response => {
    //console.log(response.data);
    if(response.success == true){
        ProfileWidget.showProfile(response.data);
    }
});

// 3. Получение текущих курсов валюты:
// 3.1. Создайте объект типа RatesBoard.
const ratesBoard = new RatesBoard();


// 3.2. Напишите функцию, которая будет выполнять запрос получения курсов валют.
// 3.3. В случае успешного запроса, очищайте таблицу с данными (clearTable) и заполняйте её (fillTable) полученными данными.
ratesBoard.getStocks = () => ApiConnector.getStocks(response => {
    if(response.success){
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    };
});

// 3.4. Вызовите данную функцию для получения текущих валют.

const now = new Date();
ratesBoard.getStocks();

// 3.5. Напишите интервал, который будет многократно выполняться (раз в минуту) и вызывать вашу функцию с получением валют.
setInterval(() => {
    const callbackTime = new Date();
    // console.log("прошло - " + (callbackTime - now));
    
    ratesBoard.getStocks();
}, 60000);

// 4. Операции с деньгами
// 4.1. Создайте объект типа MoneyManager
const moneyManager = new MoneyManager();
// 4.2. Реализуйте пополнение баланса:
// 4.2.1. Запишите в свойство addMoneyCallback функцию, которая будет выполнять запрос.

moneyManager.addMoneyCallback = (data) => {
    // console.log(data);
    ApiConnector.addMoney(data, () => {
        if(data){
            // console.log(data);

            location.reload();            //  обновить не получается, два раза нажимаешь пополнить, тогда обновляет
        }
    });
};


moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, () => {
        if(data){
            console.log(data);              // а так надо обновлять страницу после конветации
            // location.reload();            //  обновить не получается, два раза нажимаешь конвертировать, тогда обновляет

        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, () => {
        if(data){
            console.log(data);
        }
    });
}










// getStocks(callback)` — запрос на получение курсов валют      // ApiConnector.getStocks(response => console.log(response.data)); // работает

// logoutButton.action = () => {
//     ApiConnector.logout(response => 