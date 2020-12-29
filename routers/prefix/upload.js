/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-12-02 18:32:00
 * @LastEditors: Please set LastEditors
 * @Description: 上传文件
 * @FilePath: \server\routers\prefix\utils.js
 */
import Router from "koa-router"
import { getErrObj, getSuccObj, NGINX, NGINX_URL } from "../../config"
import sharp from "sharp"
import { getDate, mkdirs } from "../../utils/index"
import path from "path"
import fs from "fs"
import Model from "../../mysql/model/index"
const TemFile = Model.TemFile

const router = new Router()
router.prefix("/upload")

const DEFAULT_FILE = "ly_website"

router.post("/image", async ctx => {
    
    let file = ctx.request.files.file
    let dir = ctx.request.body.dir || DEFAULT_FILE

    if(!file) {
        ctx.body = getErrObj({
            data: "文件不能为空"
        })
        return
    }
    
    let dirname = dir + `/${getDate()}`
    let width = ctx.request.body.width
    let height = ctx.request.body.height

    let uploadPath = `${NGINX}/${DEFAULT_FILE}/${dirname}`

    try {
        mkdirs(path.resolve(uploadPath))
        const image = sharp(file.path)

        let data = await image.metadata()
        let name = `${Number(new Date())}.${data.format}`
        
        width = Math.floor(width || data.width)
        height = Math.floor(height || data.height)


        await image.resize({
                width,
                height
            })
            .toFile(`${uploadPath}/${name}`)

        ctx.body = getSuccObj({
            data: `${NGINX_URL}/${DEFAULT_FILE}/${dirname}/${name}`,
            msg: "图片上传成功"
        })
    } catch (error) {
        ctx.body = getErrObj({
            data: error
        })
    }
})


router.post("/files", async ctx => {
    let file = ctx.request.files.file
    let dir = ctx.request.body.dir || DEFAULT_FILE

    if(!file) {
        ctx.body = getErrObj({
            data: "文件不能为空"
        })
        return
    }

    let dirname = dir + `/${getDate()}`
    let uploadPath = `${NGINX}/${DEFAULT_FILE}/${dirname}`

    try {
        let preName = file.name.substr(0, file.name.lastIndexOf("."))
        let type = file.name.substr(file.name.lastIndexOf("."), file.name.length)
        let name = `${preName}${Number(new Date())}`

        if(name.length > 25) {
            name = name.substr(0,25)
        }
        name = name + type
        
        mkdirs(path.resolve(uploadPath))

        const reader = fs.createReadStream(file.path)
        const upStream = fs.createWriteStream(`${uploadPath}/${name}`)
        reader.pipe(upStream)
        

        let data = await TemFile.create({
            ly_title: name,
            ly_date: Date.now(),
            ly_url: `/${DEFAULT_FILE}/${dirname}/${name}`
        })

        ctx.body = getSuccObj({
            data: {
                id: data.id,
                title: name,
                url: `${NGINX_URL}/${DEFAULT_FILE}/${dirname}/${name}`,
            },
            msg: "文件上传成功"
        })

    } catch (error) {
        ctx.body = getErrObj({
            data: error
        })
    }
    
})


router.post("/del", async ctx => {
    let { id, ly_url } = ctx.request.body

    if(!id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }
        
    try{
        ly_url = ly_url.replace(NGINX_URL, "")
        ly_url = `${NGINX}/${ly_url}`

        fs.unlinkSync(ly_url)

    }catch(err) {
        ctx.body = getErrObj({
            data: err
        })
        return
    }

    await TemFile.destroy({
        where: {
            id
        }
    })

    ctx.body = getSuccObj({
        data: "删除成功"
    })
})


export default module.exports  = router