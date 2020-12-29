/*
 * @Author: your name
 * @Date: 2020-11-27 16:16:00
 * @LastEditTime: 2020-12-02 16:28:58
 * @LastEditors: Please set LastEditors
 * @Description: 轮播图列表
 * @FilePath: \server\routers\prefix\Carousel.js
 */

import Router from "koa-router"
import { getErrObj, getSuccObj, NGINX_URL } from "../../config"
import Model from "../../mysql/model/index"
import { delFile } from "../../utils/index"

const router = new Router()
router.prefix("/carousel")

const Carousel = Model.Carousel

/**
 * 查询轮播图列表
 */
router.get("/get", async ctx => {
    let page = ctx.query.page || 1
    let page_size = ctx.query.page_size || 10
    let { is_show } = ctx.query

    let data
    let where = {}
    
    if(is_show) {
        where.is_show = is_show
    }

    try{
        data =  await Carousel.findAndCountAll({
            attributes: ["id", "ly_image", "ly_date", "is_show", "ly_content"],
            offset: (--page) * page_size,
            limit: +page_size,
            distinct: true,
            where,
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
 * 修改轮播图
 */
router.post("/update", async ctx => {
    let { id, ly_image, ly_date, is_show, ly_content } = ctx.request.body

    if(!id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }

    if(ly_image) {
        ly_image = ly_image.replace(NGINX_URL, "")
    }

    try{
        let data = await Carousel.update({
            ly_image,
            ly_date,
            is_show,
            ly_content
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
 * 添加轮播图
 */
router.post("/insert", async ctx => {
    let { ly_image, ly_content } = ctx.request.body
    let ly_date = ctx.request.body.ly_date || Date.now()

    if(!ly_image) {
        ctx.body = getErrObj({
            data: "图片不能为空"
        })
        return
    }

    if(ly_image) {
        ly_image = ly_image.replace(NGINX_URL, "")
    }
    
    try{
        let data = await Carousel.create({
            ly_image,
            ly_date,
            ly_content
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

        let urls = await Carousel.findOne({
            attributes: ["ly_image"],
            where: {
                id
            }
        })
        delFile(urls.ly_image)

        let data = await Carousel.destroy({
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