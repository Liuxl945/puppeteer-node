/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 11:52:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\mysql\model\log.js
 */
import sequelize from "../index"
import { DataTypes } from "sequelize"
import moment from "moment"

const Log = sequelize.define("lo",{
    id: {
        type: DataTypes.INET,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "错误信息ID"
    },
    ly_content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "错误内容"
    },
    ly_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "创建时间",
        get() {
            return moment(this.getDataValue("ly_date")).format("YYYY-MM-DD HH:mm:ss")
        }
    }
},{
    tableName: "ly_log",
    timestamps: false
})


export default Log