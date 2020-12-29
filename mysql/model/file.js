/*
 * @Author: your name
 * @Date: 2020-11-26 11:42:41
 * @LastEditTime: 2020-12-02 16:30:04
 * @LastEditors: Please set LastEditors
 * @Description: 文件表
 * @FilePath: \server\mysql\model\carousel.js
 */


import sequelize from "../index"
import { DataTypes } from "sequelize"
import moment from "moment"
import { NGINX_URL } from "../../config"

const File = sequelize.define("fi",{
    id: {
        type: DataTypes.INET,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "文件ID"
    },
    ly_type_id: {
        type: DataTypes.INET,
        allowNull: true,
        comment: "类型ID"
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
    is_show: {
        type: DataTypes.INET,
        allowNull: true,
        defaultValue: 1,
        comment: "是否显示 1 是 0 否",
        get() {
            return this.getDataValue("is_show") === 1
        }
    },
    ly_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "发表时间",
        get() {
            return moment(this.getDataValue("ly_date")).format("YYYY-MM-DD HH:mm:ss")
        }
    },
    tem_id: {
        type: DataTypes.INET,
        allowNull: true,
        comment: "临时表ID"
    }
},{
    tableName: "ly_file",
    timestamps: false
})


export default File