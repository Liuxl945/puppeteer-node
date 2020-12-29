/*
 * @Author: your name
 * @Date: 2020-11-26 12:22:51
 * @LastEditTime: 2020-11-27 17:20:44
 * @LastEditors: Please set LastEditors
 * @Description: 公告表
 * @FilePath: \server\mysql\model\notice.js
 */

import sequelize from "../index"
import { DataTypes } from "sequelize"
import moment from "moment"
import { NGINX_URL } from "../../config"

const Legal = sequelize.define("le",{
    id: {
        type: DataTypes.INET,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "法律ID"
    },
    ly_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "标题"
    },
    ly_views: {
        type: DataTypes.INET,
        allowNull: true,
        comment: "查看量"
    },
    ly_caption: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "简介"
    },
    ly_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "发表时间",
        get() {
            return moment(this.getDataValue("ly_date")).format("YYYY-MM-DD HH:mm:ss")
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
    ly_content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "法律内容"
    },
    ly_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "图片路径",
        get() {
            return NGINX_URL + this.getDataValue("ly_image")
        }
    },
    ly_file: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "附件列表"
    },
},{
    tableName: "ly_legal",
    timestamps: false
})


export default Legal