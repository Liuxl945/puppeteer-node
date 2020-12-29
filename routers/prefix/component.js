/*
 * @Author: your name
 * @Date: 2020-11-27 17:32:36
 * @LastEditTime: 2020-11-28 11:42:25
 * @LastEditors: Please set LastEditors
 * @Description: 公告类型
 * @FilePath: \server\routers\prefix\notice_type.js
 */

import Router from "koa-router"
import { getErrObj, getSuccObj } from "../../config"
import Model from "../../mysql/model/index"

const NoticeType = Model.NoticeType

const router = new Router()
router.prefix("/component")

/**
 * 查询公告类型列表
 */
router.get("/get", async ctx => {
    
})

/**
 * 添加公告类型
 */
router.post("/update", async ctx => {
    
})

/**
 * 修改公告类型
 */
router.post("/insert", async ctx => {
    
})


/**
 * 删除
 */
router.post("/del", async ctx => {
    
})


export default module.exports  = router