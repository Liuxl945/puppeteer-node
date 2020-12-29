/*
 * @Author: your name
 * @Date: 2020-12-02 18:21:48
 * @LastEditTime: 2020-12-02 18:28:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\mysql\model\tem_file.js
 */

 
import sequelize from "../index"
import { DataTypes } from "sequelize"
import moment from "moment"
import { NGINX_URL } from "../../config"

const TemFile = sequelize.define("tf",{
    id: {
        type: DataTypes.INET,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "文件ID"
    },
    ly_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "文件标题"
    },
    ly_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "文件路径",
        get() {
            return NGINX_URL + this.getDataValue("ly_url")
        }
    },
    ly_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "发表时间",
        get() {
            return moment(this.getDataValue("ly_date")).format("YYYY-MM-DD HH:mm:ss")
        }
    }
},{
    tableName: "ly_tem_file",
    timestamps: false
})


export default TemFile