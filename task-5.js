/**
 * Задание 5
 * Вам дан набор из функции вызова middleware и осн. функции,
 * а также вспомогательные констаны и переменные
 * Ваша задача: Внимательно проанализировав предоставленный код,
 * написать код transformResponse middleware, задача которого отлавливать
 * возникающие в результате выполнения внутренних вызовов (next(...)) ошибки (Errors) и трансформировать их
 * в response, который затем возвращается как результат e.g.:
 * {
 *     "error": <Сообщение об ошибке>
 * }
 * Менять предоставленный код - нельзя (для дебага можно).
 * Только реализовать transformResponse()
 * Проверить работоспособность кода.
 */
// Application or "core" logic

const app = function (request) {
    return { status: 200, message: "Ok" };
};

// Transform response middleware
const transformResponse = function (request, next) {
    try {
        return next(request);
    }
    catch (err) {
        return { "error": err.message}
    }
};

// Check Auth middleware
const checkAuthMiddleware = function (request, next) {
    if (!request.user) {
        throw Error('No unauthorized requests');
    }

    return next(request);
};

// Middleware stack
// Hint: Don't forget to register transformResponse MW...
const middlewares = [
    transformResponse,
    checkAuthMiddleware,
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