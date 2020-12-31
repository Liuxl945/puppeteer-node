/*
 * @Author: your name
 * @Date: 2020-11-27 17:32:36
 * @LastEditTime: 2020-11-28 11:42:25
 * @LastEditors: Please set LastEditors
 * @Description: 文章
 * @FilePath: \server\routers\prefix\notice_type.js
 */

import Router from "koa-router"
import { getErrObj, getSuccObj } from "../../config"
import Model from "../../mysql/model/index"

const router = new Router()
router.prefix("/36kr")

/**
 * 查询36kr文章列表
 */
router.get("/get", async ctx => {
    let page = ctx.query.page || 1
    let page_size = ctx.query.page_size || 10

    let data
    try{
        data = await Model.Article36kr.findAndCountAll({
            attributes: ["id", "title", "summary", "details", "user_id", "user_name", "date"],
            offset: (--page) * page_size,
            limit: +page_size,
            distinct: true,
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
 * 查询36kr文章详情
 */
router.post("/details", async ctx => {
    let { id } = ctx.query

    if(!id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }
    let res = await Legal.findAll({
        attributes: ["id", "title", "summary", "details", "user_id", "user_name", "date"],
        where: {
            id
        }
    })

    ctx.body = getSuccObj({
        data: res.length ? res[0] : null, 
    })
})


export default module.exports  = router