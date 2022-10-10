import { sequelize } from "./sequelize.config";

/**
 * Represent sendRawQuery
 * @param query {String}
 * @param replacementOpt {Object}
 * @param init {Object|Array|null=}
 * @returns {Promise<[undefined, number]|null>}
 * 한개의 로우만을 조회하는 용도의 함수
 */
export const sendRawQuery = async (query, replacementOpt, init) => {
    try {
        let _init = init ? init : null;
        const [data, metadata] = await sequelize.query(query, {
            replacements: replacementOpt,
            type: null,
            nest: true,
        });

        return data || _init;
    } catch (err) {
        console.log(`ERROR: Query error : ${err} in ${query}`);
        console.log(err.stack);
        throw new Error(
            "QUERY ERROR : For detailed error causes, check the console log query."
        );
    }
};


export const sendRawQueryFindAll = async (query, replacementOpt, init) => {
    try {
        let _init = init ? init : null;
        const data = await sequelize.query(query, {
            replacements: replacementOpt,
            type: null,
            nest: true,
        });

        if (data.length === 0) return _init || null;
        else return data || _init;
    } catch (err) {
        console.log(`ERROR: Query error : ${err} in ${query}`);
        console.log(err.stack);
        throw new Error(
            "QUERY ERROR : For detailed error causes, check the console log query."
        );
    }
};
