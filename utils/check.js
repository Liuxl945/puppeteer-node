import jwt from "jsonwebtoken"
import { secretOrPrivateKey } from "../config"


/**
 * 检查token是否过期
 * @param {*} ctx 
 * @param {*} next 
 */
async function check(ctx, next) {
    let url = ctx.request.url
    if (url === "/user/login" || url === "/upload/files" || url === "/upload/image" || url === "/user/token") {
        await next()
    }else{
        let token = ctx.request.header["authorization"]
        
        let userInfo 
        try {
            userInfo = jwt.verify(token, secretOrPrivateKey)
        } catch (error) {
            userInfo = {
                user_id: null
            }
        }

        if(userInfo.user_id) {
            // 未过期
            await next()
        }else{
            ctx.body = {
                code: 50014,
                msg: "401没有权限",
                data: "401没有权限"
            }
        }
    }
}

export default check