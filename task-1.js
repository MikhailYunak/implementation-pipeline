/**
 * Задание 1
 * Вам дан набор из 1 middleware и осн. функции,
 * а также вспомогательные констаны и переменные
 * Ваша задача: Внимательно проанализировав предоставленный код,
 * восстановить код функции executeMiddlewareChain(),
 * которая реализует поочерёдный вызов зарегистрированных middlewares,
 * с передачей request/next в параметрах и получением response как результата
 * выполнения. Менять предоставленный код - нельзя (для дебага можно).
 * Только реализовать executeMiddlewareChain()
 * Проверить работоспособность кода.
 */


// Application or "core" logic
const app = function (request) {
    return { status: 200, message: "Ok"};
};

// Check Auth middleware
const checkAuthMiddleware = function(request, next) {
    if(!request.user) {
        throw Error('No unauthorized requests');
    }

    return next(request);
};

// Middleware stack
const middlewares = [
    checkAuthMiddleware,
    app
];

// Execute middleware func
function executeMiddlewareChain(request) {
    let next = middlewares.shift();
    return next(request, executeMiddlewareChain);
}

const request = {
    user: {
        name: "john@doe.com"
    }
};

const response = executeMiddlewareChain(request);

console.log(response);