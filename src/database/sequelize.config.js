import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'
dotenv.config();

export const env = process.env.NODE_ENV;

const sequelizeGlobalConfig ={
    dialect: "postgres",
    charset: "utf8",
    define: {
        underscored: true,
    },
    timezone: "+09:00",
}

const sequelizeConfig = {
    develop: {
        username: process.env.DEV_DATABASE_USER_NAME,
        password: process.env.DEV_DATABASE_PASSWORD,
        database: process.env.DEV_DATABASE_NAME,
        host: process.env.DEV_DATABASE_HOST,
        logging: false, // 콘솔 내 쿼리 로그,
    },
    staged: {
        username: process.env.DEV_DATABASE_USER_NAME,
        password: process.env.DEV_DATABASE_PASSWORD,
        database: process.env.DEV_DATABASE_NAME,
        host: process.env.DEV_DATABASE_HOST,
        timezone: "+09:00",
    },

    production: {
        username: process.env.PROD_DATABASE_USER_NAME,
        password: process.env.PROD_DATABASE_PASSWORD,
        database: process.env.PROD_DATABASE_NAME,
        host: process.env.PROD_DATABASE_HOST,
        timezone: "+09:00",
    },
};

console.log(sequelizeConfig[env])

export const sequelize = new Sequelize(
    {
        ...sequelizeConfig[env], ...sequelizeGlobalConfig
    }
);

