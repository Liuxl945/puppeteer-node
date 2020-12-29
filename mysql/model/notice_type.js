/*
 * @Author: your name
 * @Date: 2020-11-26 11:42:41
 * @LastEditTime: 2020-11-27 16:49:35
 * @LastEditors: Please set LastEditors
 * @Description: 文件表
 * @FilePath: \server\mysql\model\carousel.js
 */


import sequelize from "../index"
import { DataTypes } from "sequelize"
import moment from "moment"

const NoticeType = sequelize.define("nt",{
    id: {
        type: DataTypes.INET,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "类型ID"
    },
    ly_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "名称"
    },
    sort: {
        type: DataTypes.INET,
        allowNull: true,
        comment: "排序"
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
    tableName: "ly_notice_type",
    timestamps: false
})


export default NoticeType