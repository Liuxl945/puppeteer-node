/*
 * @Author: your name
 * @Date: 2020-11-27 16:16:00
 * @LastEditTime: 2020-12-02 18:11:45
 * @LastEditors: Please set LastEditors
 * @Description: 文件列表
 * @FilePath: \server\routers\prefix\File.js
 */

import Router from "koa-router"
import { getErrObj, getSuccObj, NGINX, NGINX_URL } from "../../config"
import Model from "../../mysql/model/index"
import fs from "fs"
import Legal from "../../mysql/model/legal"
import { delFile } from "../../utils/index"

const router = new Router()
router.prefix("/file")

const File = Model.File
const FileType = Model.FileType
const TemFile = Model.TemFile

/**
 * 查询文件列表
 */
router.get("/get", async ctx => {
    let page = ctx.query.page || 1
    let page_size = ctx.query.page_size || 10
    let { ly_type_id, is_show, admin } = ctx.query

    let data
    let where = {}
    
    if(is_show) {
        where.is_show = is_show
    }

    if(ly_type_id) {
        where.ly_type_id = ly_type_id
    }

    let include
    if(admin) {
        include = [
            {
                model: FileType,
                as: "type",
                attributes: ["ly_name", "id"]
            },
            {
                model: TemFile,
                as: "ttype",
                attributes: ["id", "ly_title"]
            }
        ]
    }

    try{
        data =  await File.findAndCountAll({
            attributes: ["id", "ly_title", "ly_date", "is_show", "ly_url"],
            offset: (--page) * page_size,
            limit: +page_size,
            distinct: true,
            where,
            include,
            order: [
                ["ly_date", "DESC"]
            ],
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
 * 修改文件
 */
router.post("/update", async ctx => {
    let { id, ly_title, ly_date, is_show, ly_url, ly_type_id, tem_id } = ctx.request.body

    if(!id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }

    if(ly_url) {
        ly_url = ly_url.replace(NGINX_URL, "")
    }

    try{
        let data = await File.update({
            ly_title,
            ly_date,
            is_show,
            ly_url,
            ly_type_id,
            tem_id
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
 * 添加文件
 */
router.post("/insert", async ctx => {
    let { ly_title, ly_url, ly_type_id, tem_id } = ctx.request.body
    let ly_date = ctx.request.body.ly_date || Date.now()

    if(!ly_title) {
        ctx.body = getErrObj({
            data: "标题不能为空"
        })
        return
    }
    
    if(!ly_url) {
        ctx.body = getErrObj({
            data: "文件不能为空"
        })
        return
    }

    if(!ly_type_id) {
        ctx.body = getErrObj({
            data: "文件类型不能为空"
        })
        return
    }

    if(!tem_id) {
        ctx.body = getErrObj({
            data: "tem_id不能为空"
        })
        return
    }

    ly_url = ly_url.replace(NGINX_URL, "")
    
    try{
        let data = await File.create({
            ly_title,
            ly_date,
            ly_url,
            ly_type_id,
            tem_id
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
 * 点击文章 +1 
 */
router.post("/click", async ctx => {
    let { id } = ctx.request.body
    
    let res = await Legal.findOne({
        attributes: ["ly_views"],
        where: {
            id
        }
    })
    
    if(res){

        let upddata = { ly_views: +res.ly_views + 1 } 

        res = await Legal.update(upddata, {
            where: {
                id
            }
        })
    }
    

    ctx.body = getSuccObj({
        data: res || "操作成功"
    })

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

        let urls = await File.findOne({
            attributes: ["ly_url"],
            where: {
                id
            }
        })
        delFile(urls.ly_url)
        
        let data = await File.destroy({
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