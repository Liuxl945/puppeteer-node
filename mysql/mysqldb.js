/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 11:29:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\mysql\mysqldb.js
 */
import mysql from "mysql"
import config from "./config"

const poll = mysql.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
})

const query = (sql) => {
    return new Promise((resolve, reject) => {
        poll.getConnection((err, connection) => {
            if (err) {
                resolve(err)
                return
            }
            connection.query(sql, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
            connection.release()
        })
    })
}

module.exports = {
    query
}
