/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 11:29:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \server\mysql\index.js
 */
import { Sequelize } from "sequelize"
import config from "./config"

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "mysql",
    // 自动格式化时间
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 30000
    },
    timezone: "+08:00" //改为标准时区
})

export default sequelize
