/**
 * Задание 2
 * Вам дан набор из функции вызова middleware и осн. функции,
 * а также вспомогательные констаны и переменные
 * Ваша задача: Внимательно проанализировав предоставленный код,
 * дописать код для addTimestamp middleware, задача которой - добавлять ко
 * всякому объекту response поле timestamp со значением текущей метки времени, e.g.:
 * {
 *     ...
 *     timestamp: "2019-12-09 17:01:24Z000"
 * }
 * Менять предоставленный код - нельзя (для дебага можно).
 * Только реализовать addTimestamp()
 * Проверить работоспособность кода.
 */


// Application or "core" logic
const app = function (request) {
    return { status: 200, message: "Ok"};
};

// addTimestamp middleware
const addTimestamp = function(request, next) {
    Object.assign(request, { 'timestamp': new Date().toISOString() });
    return next(request);
};

// Middleware stack
const middlewares = [
    addTimestamp,
    app
];

// Execute middleware func
function executeMiddlewareChain(request) {
    const next = middlewares.shift();
    return next(request, executeMiddlewareChain)
}

const request = {
    user: {
        name: "john@doe.com"
    }
};

const response = executeMiddlewareChain(request);

console.log(response);