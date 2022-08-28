export const wrapperAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};

export const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
