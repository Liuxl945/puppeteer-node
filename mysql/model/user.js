/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 14:38:15
 * @LastEditors: Please set LastEditors
 * @Description: 用户表
 * @FilePath: \server\mysql\model\user.js
 */
import sequelize from "../index"
import { DataTypes } from "sequelize"
import moment from "moment"

const User = sequelize.define("us",{
    user_id: {
        type: DataTypes.INET,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "用户ID"
    },
    user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "用户名"
    },
    user_password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: "用户密码"
    },
    user_email: {
        type: DataTypes.STRING(30),
        allowNull: true,
        comment: "用户邮箱"
    },
    ly_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "注册时间",
        get() {
            return moment(this.getDataValue("ly_date")).format("YYYY-MM-DD HH:mm:ss")
        }
    },
    user_type: {
        type: DataTypes.INET,
        allowNull: true,
        comment: "用户类别 默认2 普通用户  1 超级管理员"
    }
},{
    tableName: "ly_user",
    timestamps: false
})


export default User