/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 15:15:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\index.js
 */
import Koa from "koa"
import koaBody from "koa-body"
import cors from "@koa/cors"
import registerRouter from "./routers/index"
import { CORS_URL } from "./config"
import check from "./utils/check"
const app = new Koa()

const host = "127.0.0.1"
const port = 3100

app.use(koaBody({
    multipart: true
}))
.use(cors({
    origin: (ctx) => {
        if(CORS_URL.includes(ctx.request.header.origin)) {
            return ctx.request.header.origin
        }
        return CORS_URL[0]
    },
    allowMethods: ["GET", "POST", "PUT"]
}))
// .use(check)
.use(registerRouter())
.listen(port, host)


