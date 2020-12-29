/*
 * @Author: your name
 * @Date: 2020-11-27 17:32:36
 * @LastEditTime: 2020-11-28 11:42:25
 * @LastEditors: Please set LastEditors
 * @Description: 公告类型
 * @FilePath: \server\routers\prefix\notice_type.js
 */

import Router from "koa-router"
import { getErrObj, getSuccObj, NGINX_URL } from "../../config"
import Model from "../../mysql/model/index"
import { delFile } from "../../utils/index"

const Legal = Model.Legal
const TemFile = Model.TemFile

const router = new Router()
router.prefix("/legal")

/**
 * 查询公告类型列表
 */
router.get("/get", async ctx => {
    let page = ctx.query.page || 1
    let page_size = ctx.query.page_size || 10
    let { is_show, admin } = ctx.query

    let data
    let where = {}
    
    if(is_show) {
        where.is_show = is_show
    }

    try{
        data =  await Legal.findAndCountAll({
            attributes: ["id", "ly_title", "ly_date", "is_show", "ly_content", "ly_file", "ly_image", "ly_caption"],
            offset: (--page) * page_size,
            limit: +page_size,
            distinct: true,
            where,
            order: [
                ["ly_date", "DESC"]
            ],
        })

        // 查询出关联的标签   多个
        if(data.count && admin) {
            let res = await TemFile.findAll({
                attributes: ["id", "ly_title","ly_url"],
            })

            data.rows.forEach(item => {
                item.dataValues.files = []
                if(item.ly_file) {
                    let arr = item.ly_file.split(",")
                    
                    for(let i = 0; i< res.length; i++) {
                        if(arr.includes(res[i].id + "")){
                            item.dataValues.files.push({
                                id: res[i].id,
                                title: res[i].ly_title,
                                url: res[i].ly_url
                            })
                        }
                        if(item.dataValues.files.length === arr.length) {
                            break
                        }
                    }
                }
            })
        }
    
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
 * 查看详情
 */
router.get("/details", async ctx => {
    let { id } = ctx.query

    if(!id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }
    let res = await Legal.findAll({
        attributes: ["id", "ly_title", "ly_date", "is_show", "ly_content", "ly_file", "ly_image", "ly_caption"],
        where: {
            id
        }
    })

    ctx.body = getSuccObj({
        data: res.length ? res[0] : null, 
    })
})

/**
 * 添加公告类型
 */
router.post("/update", async ctx => {
    let { id, ly_title, ly_date, is_show, ly_content, ly_file, ly_image, ly_caption } = ctx.request.body

    if(!id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }

    if(!Array.isArray(ly_file)) {
        ctx.body = getErrObj({
            data: "ly_file必须是数组"
        })
        return
    }

    let file = ly_file.map(item => {
        return item.id
    })

    if(!ly_image) {
        ctx.body = getErrObj({
            data: "ly_image不能为空"
        })
        return
    }

    if(!ly_caption) {
        ctx.body = getErrObj({
            data: "ly_caption不能为空"
        })
        return
    }

    ly_image = ly_image.replace(NGINX_URL, "")

    try{

        let data = await Legal.update({
            ly_title,
            ly_date,
            is_show,
            ly_content,
            ly_file: file.toString(),
            ly_image,
            ly_caption
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
 * 修改公告类型
 */
router.post("/insert", async ctx => {
    let { ly_title, ly_content, ly_file, ly_image, ly_caption } = ctx.request.body
    let ly_date = ctx.request.body.ly_date || Date.now()

    if(!ly_title) {
        ctx.body = getErrObj({
            data: "标题不能为空"
        })
        return
    }
    
    if(!ly_content) {
        ctx.body = getErrObj({
            data: "内容详情不能为空"
        })
        return
    }

    if(!ly_image) {
        ctx.body = getErrObj({
            data: "标题图片不能为空"
        })
        return
    }

    if(!ly_caption) {
        ctx.body = getErrObj({
            data: "简介不能为空"
        })
        return
    }

    ly_image = ly_image.replace(NGINX_URL, "")

    if(!Array.isArray(ly_file)) {
        ctx.body = getErrObj({
            data: "ly_file必须是数组"
        })
        return
    }

    let file = ly_file.map(item => {
        return item.id
    })
    
    
    try{
        let data = await Legal.create({
            ly_title,
            ly_date,
            ly_content,
            ly_file: file.toString(),
            ly_image,
            ly_caption
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
        let urls = await Legal.findOne({
            attributes: ["ly_image"],
            where: {
                id
            }
        })
        delFile(urls.ly_image)
    
        let data = await Legal.destroy({
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