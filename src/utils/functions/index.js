export const wrapperAsync = (fn) =>  async (req, res, next) => await fn(req, res, next).catch(next);

export const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
