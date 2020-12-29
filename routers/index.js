/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-27 16:14:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \server\routers\index.js
 */
import compose  from "koa-compose"
import { resolve } from "path"
import glob from "glob"

function registerRouter() {
    let routers = []

    glob.sync(resolve(__dirname,"./","**/*.js"))
    .filter(router => (router.indexOf("index.js")) === -1)
    .map(router => {
        routers.push(require(router).routes())
        routers.push(require(router).allowedMethods())
    })

    return compose(routers)
}

export default registerRouter