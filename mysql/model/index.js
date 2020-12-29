/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-12-02 18:24:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\mysql\model\index.js
 */
import Carousel from "./carousel"
import FileType from "./file_type"
import File from "./file"
import Log from "./log"
import NoticeType from "./notice_type"
import Notice from "./notice"
import User from "./user"
import TemFile from "./tem_file"
import Legal from "./legal"

File.hasOne(FileType, {
    sourceKey: "ly_type_id", //主键
    foreignKey: "id", //外键
    as: "type"
})

File.hasOne(TemFile, {
    sourceKey: "tem_id", //主键
    foreignKey: "id", //外键
    as: "ttype"
})

Notice.hasOne(NoticeType, {
    sourceKey: "ly_type_id",
    foreignKey: "id",
    as: "type"
})

export default {
    Carousel,
    FileType,
    File,
    Legal,
    Log,
    NoticeType,
    Notice,
    User,
    TemFile
}