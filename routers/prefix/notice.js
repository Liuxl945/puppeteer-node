/*
 * @Author: your name
 * @Date: 2020-11-27 16:16:00
 * @LastEditTime: 2020-12-02 11:44:49
 * @LastEditors: Please set LastEditors
 * @Description: 公告列表
 * @FilePath: \server\routers\prefix\notice.js
 */

import Router from "koa-router"
import { getErrObj, getSuccObj } from "../../config"
import Model from "../../mysql/model/index"
import { delFile } from "../../utils/index"

const router = new Router()
router.prefix("/notice")

const Notice = Model.Notice
const NoticeType = Model.NoticeType
const TemFile = Model.TemFile

// 循环查询
async function getTemFile(list) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i]
        item.dataValues.files = []

        if(item.ly_file) {
            let arr = item.ly_file.split(",")
            
            let arrList = []
            for(let j = 0; j< arr.length; j++) {
                
                arrList.push((async () => {
                    let res = await TemFile.findOne({
                        attributes: ["id", "ly_title","ly_url"],
                        where: {
                            id: arr[j]
                        }
                    })
                    
                    if(res) {
                        item.dataValues.files.push({
                            id: res.id,
                            title: res.ly_title,
                            url: res.ly_url
                        })

                        return Promise.resolve({
                            id: res.id,
                            title: res.ly_title,
                            url: res.ly_url
                        }) 
                    }else {
                        return Promise.resolve() 
                    }
                    
                })())
                
            }

            await Promise.all(arrList)
        }
    }
}


/**
 * 查询公告列表
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

    try{
        data =  await Notice.findAndCountAll({
            attributes: ["id", "ly_title", "ly_date", "is_show", "ly_content", "ly_file"],
            offset: (--page) * page_size,
            limit: +page_size,
            distinct: true,
            where,
            include: [
                {
                    model: NoticeType,
                    as: "type",
                    attributes: ["ly_name", "id"]
                }
            ],
            order: [
                ["ly_date", "DESC"]
            ],
        })

        // 查询出关联的标签   多个
        if(data.count && admin) {

            for (let i = 0; i < data.rows.length; i++) {
                const item = data.rows[i]
                item.dataValues.files = []

                if(item.ly_file) {
                    let arr = item.ly_file.split(",")

                    for(let j = 0; j< arr.length; j++) {
                        
                        let res = await TemFile.findOne({
                            attributes: ["id", "ly_title","ly_url"],
                            where: {
                                id: arr[j]
                            }
                        })

                        if(res) {
                            item.dataValues.files.push({
                                id: res.id,
                                title: res.ly_title,
                                url: res.ly_url
                            })
                        }
                    }
                }
            }
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
    let res = await Notice.findAll({
        attributes: ["id", "ly_title", "ly_date", "is_show", "ly_content", "ly_file"],
        where: {
            id
        },
        include: [
            {
                model: NoticeType,
                as: "type",
                attributes: ["ly_name", "id"]
            }
        ],
    })
    let data = res.length ? res[0] : null

    if(data) {
        data.dataValues.files = []
        let arr = data.ly_file.split(",")
                    
        for(let i = 0;i < arr.length; i++) {
            let item = await TemFile.findOne({
                attributes: ["id", "ly_title","ly_url"],
                where: {
                    id: arr[i]
                }
            })
            // 如果查询到了值
            if(item) {
                data.dataValues.files.push({
                    id: item.id,
                    title: item.ly_title,
                    url: item.ly_url
                })
            }
            
        }
    }

    ctx.body = getSuccObj({
        data
    })
})

/**
 * 修改公告
 */
router.post("/update", async ctx => {
    let { id, ly_title, ly_date, is_show, ly_content, ly_file, ly_type_id } = ctx.request.body

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

    try{

        let data = await Notice.update({
            ly_title,
            ly_date,
            is_show,
            ly_content,
            ly_file: file.toString(),
            ly_type_id
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
 * 添加公告
 */
router.post("/insert", async ctx => {
    let { ly_title, ly_content, ly_file, ly_type_id } = ctx.request.body
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

    if(!ly_type_id) {
        ctx.body = getErrObj({
            data: "公告类型不能为空"
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
    
    
    try{
        let data = await Notice.create({
            ly_title,
            ly_date,
            ly_content,
            ly_file: file.toString(),
            ly_type_id
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
 * 添加首页公告列表
 */
router.get("/all", async ctx => {
    let page = ctx.query.page || 1
    let page_size = ctx.query.page_size || 3

    let data
    let arr = [] //最终返回的数据

    try{
        data =  await NoticeType.findAndCountAll({
            attributes: ["id", "ly_name"],
            offset: (--page) * page_size,
            limit: +page_size,
            distinct: true,
        })

        // 查询出关联的标签   多个
        if(data.count) {
            
            for(let i = 0; i < data.rows.length; i++) {
                let item = data.rows[i]

                let res = await Notice.findAll({
                    attributes: ["id", "ly_title","ly_date"],
                    offset: 0,
                    limit: 3,
                    where: {
                        is_show: 1,
                        ly_type_id: item.id
                    },
                    order: [
                        ["ly_date", "DESC"]
                    ],
                })
                arr.push({
                    id: item.id,
                    ly_name: item.ly_name,
                    list: res
                })
            }
        }

        ctx.body = getSuccObj({
            data: arr
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
    
    let res = await Notice.findOne({
        attributes: ["ly_views"],
        where: {
            id
        }
    })
    
    if(res){

        let upddata = { ly_views: +res.ly_views + 1 } 

        res = await Notice.update(upddata, {
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
        let urls = await Notice.findAll({
            attributes: ["ly_file"],
            where: {
                id
            }
        })

        if(urls.count) {
            for (let i = 0; i < urls.rows.length; i++) {
                const item = urls.rows[i]
                
                if(item.ly_file) {
                    let arr = item.ly_file.split(",")
    
                    for(let j = 0; j< arr.length; j++) {
                        
                        let res = await TemFile.findOne({
                            attributes: ["id", "ly_title","ly_url"],
                            where: {
                                id: arr[j]
                            }
                        })
    
                        if(res) {
                            delFile(res.ly_url)
                        }
                    }
                }
            }
        }
        

        let data = await Notice.destroy({
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