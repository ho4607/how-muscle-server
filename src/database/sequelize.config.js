import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'
dotenv.config();

const sequelizeConfig = {
    development: {
        username: process.env.DEV_DATABASE_USER_NAME,
        password: process.env.DEV_DATABASE_PASSWORD,
        database: process.env.DEV_DATABASE_NAME,
        host: process.env.DEV_DATABASE_HOST,
        dialect: "mysql",
        charset: "utf8",
        collate: "utf8_general_ci",
        operatorsAliases: 0,
        define: {
            underscored: true,
        },
        timezone: "+09:00",
        logging: false, // 콘솔 내 쿼리 로그,
    },
    staged: {
        username: process.env.DEV_DATABASE_USER_NAME,
        password: process.env.DEV_DATABASE_PASSWORD,
        database: process.env.DEV_DATABASE_NAME,
        host: process.env.DEV_DATABASE_HOST,
        dialect: "mysql",
        charset: "utf8",
        collate: "utf8_general_ci",
        operatorsAliases: 0,
        define: {
            underscored: true,
        },
        timezone: "+09:00",
    },

    production: {
        username: process.env.PROD_DATABASE_USER_NAME,
        password: process.env.PROD_DATABASE_PASSWORD,
        database: process.env.PROD_DATABASE_NAME,
        host: process.env.PROD_DATABASE_HOST,
        dialect: "mysql",
        charset: "utf8",
        collate: "utf8_general_ci",
        operatorsAliases: 0,
        define: {
            underscored: true,
        },
        timezone: "+09:00",
    },
};

export const env = process.env.NODE_ENV;

export const sequelize = new Sequelize({
    ...sequelizeConfig[env],
});

