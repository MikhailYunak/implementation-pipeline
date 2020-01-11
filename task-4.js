/**
 * Задание 4
 * Вам дан набор из 1 middleware и осн. функции,
 * а также вспомогательные констаны и переменные
 * Ваша задача: Внимательно проанализировав предоставленный код,
 * восстановить код функции executeMiddlewareChain(),
 * которая реализует поочерёдный вызов зарегистрированных middlewares,
 * с последовательной передачей всего контекста как глобальной переменной.
 * Менять предоставленный код - нельзя (для дебага можно).
 * Только реализовать executeMiddlewareChain()
 * Проверить работоспособность кода.
 */


// Application or "core" logic
const app = function (context) {
    context.response = { status: 200, message: "Ok"};
};

// Check Auth middleware
const checkAuthMiddleware = function({ request, response }, next) {
    if(!request.user) {
        throw Error('No unauthorized requests');
    }

    next();
};

// Middleware stack
const middlewares = [
    checkAuthMiddleware,
    app
];

var contextGlobal;
// Execute middleware func
function executeMiddlewareChain(context) {
    contextGlobal = contextGlobal? contextGlobal : context;
    const next = middlewares.shift();
    next(contextGlobal, executeMiddlewareChain);
    return contextGlobal;
}

const ctx = {
    request: {
        user: {
            name: "john@doe.com"
        }
    },
    response: {}
};

const response = executeMiddlewareChain(ctx);

console.log(response);