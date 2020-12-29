/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 15:15:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \server\routers\router.js
 */
import Router from "koa-router"


const router = new Router()

router.get("/", async ctx => {

    ctx.body = ctx.ip
})


module.exports  = router