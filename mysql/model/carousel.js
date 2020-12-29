/*
 * @Author: your name
 * @Date: 2020-11-26 11:42:41
 * @LastEditTime: 2020-12-02 16:33:34
 * @LastEditors: Please set LastEditors
 * @Description: 轮播图表
 * @FilePath: \server\mysql\model\carousel.js
 */


import sequelize from "../index"
import { DataTypes } from "sequelize"
import moment from "moment"
import { NGINX_URL } from "../../config"

const Carousel = sequelize.define("ca",{
    id: {
        type: DataTypes.INET,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "轮播图ID"
    },
    ly_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "图片路径",
        get() {
            return NGINX_URL + this.getDataValue("ly_image")
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
        allowNull: true,
        comment: "轮播图内容"
    },
},{
    tableName: "ly_carousel",
    timestamps: false
})


export default Carousel