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

const Article36kr = sequelize.define("ar",{
    id: {
        type: DataTypes.INET,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "文章id"
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "文章标题"
    },
    summary: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: "文章简介"
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "文章详情"
    },
    user_id: {
        type: DataTypes.INET,
        allowNull: true,
        comment: "用户id"
    },
    user_name: {
        type: DataTypes.INET,
        allowNull: true,
        comment: "用户姓名"
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "创建时间",
        get() {
            return moment(this.getDataValue("date")).format("YYYY-MM-DD HH:mm:ss")
        }
    }
},{
    tableName: "article_36kr",
    timestamps: false
})


export default Article36kr