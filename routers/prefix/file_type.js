/*
 * @Author: your name
 * @Date: 2020-11-27 17:32:36
 * @LastEditTime: 2020-12-02 14:39:50
 * @LastEditors: Please set LastEditors
 * @Description: 文件类型
 * @FilePath: \server\routers\prefix\notice_type.js
 */

import Router from "koa-router"
import { getErrObj, getSuccObj } from "../../config"
import Model from "../../mysql/model/index"

const FileType = Model.FileType
const File = Model.File

const router = new Router()
router.prefix("/ftype")

/**
 * 查询文件类型列表
 */
router.get("/get", async ctx => {
    let page = ctx.query.page || 1
    let page_size = ctx.query.page_size || 100

    let data

    try{
        data =  await FileType.findAndCountAll({
            attributes: ["id", "ly_name", "ly_date", "sort"],
            offset: (--page) * page_size,
            limit: +page_size,
            order: [
                ["sort", "DESC"],
                ["ly_date", "DESC"]
            ],
            distinct: true
        })
    
        ctx.body = getSuccObj({
            data
        })
    }catch(err) {
        ctx.body = getErrObj({
            data: err
        })
    }
})

/**
 * 修改文件类型
 */
router.post("/update", async ctx => {
    let { id, ly_name, ly_date, sort } = ctx.request.body

    if(!id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }

    try{
        let data = await FileType.update({
            ly_name,
            ly_date,
            sort
        },{
            where: {
                id
            }
        })
    
        ctx.body = getSuccObj({
            data
        })
    }catch(err) {
        ctx.body = getErrObj({
            data: err
        })
    }
})

/**
 * 添加文件类型
 */
router.post("/insert", async ctx => {
    let { ly_name, sort } = ctx.request.body
    let ly_date = ctx.request.body.ly_date || Date.now()

    try{
        let data = await FileType.create({
            ly_name,
            ly_date,
            sort
        })
    
        ctx.body = getSuccObj({
            data
        })
    }catch(err) {
        ctx.body = getErrObj({
            data: err
        })
    }
})

/**
 * 删除
 */
router.post("/del", async ctx => {
    let { id } = ctx.request.body

    if(!id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }

    try{
        let arr = await File.findAndCountAll({
            attributes: ["id"],
            where: {
                ly_type_id: id
            }
        })

        if(arr.count) {
            ctx.body = getErrObj({
                data: "分组有公告数据,不能删除"
            })
            return
        }

        let data = await FileType.destroy({
            where: {
                id
            }
        })
    
        ctx.body = getSuccObj({
            data
        })
    }catch(err) {
        ctx.body = getErrObj({
            data: err
        })
    }

})


export default module.exports  = router