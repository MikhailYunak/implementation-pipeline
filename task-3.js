/**
 * Задание 3
 * Вам дан набор из функции вызова middleware и осн. функции,
 * а также вспомогательные констаны и переменные
 * Ваша задача: Внимательно проанализировав предоставленный код,
 * дописать код для checkXHeader middleware, задача которой - проверять в
 * поступающем request наличие заголовка "X-Token". Если таковой отсутствует -
 * незамедлительно выбросить exception (Error)
 * Менять предоставленный код - нельзя (для дебага можно).
 * Только реализовать checkXHeader()
 * Проверить работоспособность кода.
 */


// Application or "core" logic
const app = function (request) {
    return { status: 200, message: "Ok"};
};

// Check header middleware middleware
const checkXHeader = function(request, next) {
    if(Object.keys(request.header) != "X-Token"){
       return new Error(`dont have a header "X-Token"`);
    }else return next(request);
};

// Middleware stack
const middlewares = [
    checkXHeader,
    app
];

// Execute middleware func
function executeMiddlewareChain(request) {
    const next = middlewares.shift();
    return next(request, executeMiddlewareChain)
}

const request = {
    header: {
        "X-Token": "1234567890"
    },
    user: {
        name: "john@doe.com"
    }
};

const response = executeMiddlewareChain(request);

console.log(response);