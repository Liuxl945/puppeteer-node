/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-12-02 16:36:36
 * @LastEditors: Please set LastEditors
 * @Description: 测试
 * @FilePath: \server\routers\prefix\test.js
 */
import Router from "koa-router"
import axios from "axios"

const router = new Router()
router.prefix("/test")

router.post("/mobile", async ctx => {
    
    let res = await axios({
        url: `http://192.168.1.195:9999/wx/notice/page?current=1&size=20`,
        headers: {
            Authorization: `Bearer edf6435c-1fba-4594-82d3-f3688bf58184`
        },
        method: "get",
    })

    ctx.body = res.data
})


export default module.exports  = router