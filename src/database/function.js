import { sequelize } from "./sequelize.config";

export const sendRawQuery = async (query, replacementOpt, type) => {
    try {
        const queryType = type ? type.toUpperCase() : null;
        const data = await sequelize.query(query, {
            replacements: replacementOpt,
            type: queryType,
            nest: true,
        });

        if (data.length === 1) return data[0];
        else return data;
    } catch (err) {
        console.log(`ERROR: Query error : ${err} in ${query}`);
        throw new Error(
            "QUERY ERROR : For detailed error causes, check the console log query."
        );
    }
};
