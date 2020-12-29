import Router from "koa-router"
import User from "../../mysql/model/user"
import jwt from "jsonwebtoken"
import md5 from "md5"
import { Op } from "sequelize"
import { getErrObj, getSuccObj, secretOrPrivateKey } from "../../config"
const router = new Router()
router.prefix("/user")

/**
 * 用户登录认证
 * user_name: 用户名
 * user_password: 密码
 * user_name: 用户类别 默认2 普通用户  1 超级管理员
 */
router.post("/login", async ctx => {
    let { user_name, user_password, user_type } = ctx.request.body

    let res = await User.findOne({
        where: {
            user_name,
            user_password: md5(user_password),
            user_type
        }
    })

    if(res.user_id) {
        let content = {user_id: res.user_id, user_name, user_type}

        let token = jwt.sign(content, secretOrPrivateKey, {
            expiresIn: 60*60*1 //60*60*1  // 1小时过期
        })
        
        ctx.body = getSuccObj({
            data: token,
            msg: "登录成功"
        })
    }else{
        ctx.body = getErrObj({
            data: "账号或者密码不正确"
        })
    }
})

/**
 * 获取token
 */
router.post("/token", async ctx => {
    let content = {user_id: "views", timestrap: Date.now()}

    // 校验token是否过期
    let authorization = ctx.request.header["authorization"]
    let userInfo 
    try {
        userInfo = jwt.verify(authorization, secretOrPrivateKey)
    } catch (error) {
        userInfo = {
            user_id: null
        }
    }

    let token
    if(userInfo.user_id) {
        token = authorization
    }else{
        token = jwt.sign(content, secretOrPrivateKey, {
            expiresIn: 60*60*1 //60*60*1  // 1小时过期
        })
    }

    ctx.body = getSuccObj({
        data: token,
        msg: "登录成功"
    })
})


/**
 * 用户注册
 * user_name  用户名
 * user_password  密码
 * user_email  用户邮箱
 * user_type  用户类别 默认2 普通用户  1 超级管理员
 */
router.post("/register", async ctx => {
    let { user_name, user_password, user_email, user_type } = ctx.request.body
    let ly_date = ctx.request.body.ly_date || Date.now()

    if(!user_name) {
        ctx.body = getErrObj({
            data: "用户名不能为空"
        })
        return
    }

    let result = await User.findAll({
        attributes: ["user_name", "user_email"],
        where: {
            [Op.or]: [
                {user_name},
                {user_email}
            ]
        }
    })

    if(result.length > 0) {
        ctx.body = getErrObj({
            data: result.user_name === user_name ? "用户名已占用" : "邮箱已占用"
        })
        return
    }

    if(user_password.length < 6) {
        ctx.body = getErrObj({
            data: "密码不能少于6位"
        })
        return
    }
    
    let res = await User.create({
        user_name, 
        user_password: md5(user_password), 
        user_email, 
        user_type,
        ly_date
    })
    
    if(res.user_id) {
        ctx.body = getSuccObj({
            data: "注册成功"
        })
    }else{
        ctx.body = getErrObj({
            data: "注册失败"
        })
    }
})

/**
 * 修改用户信息
 * user_id  用户ID
 * user_name  用户名
 * user_password  密码
 * user_email  用户邮箱
 * user_type  用户类别 默认2 普通用户  1 超级管理员
 */
router.post("/updata", async ctx => {
    let { user_id, user_name, user_password, user_email, user_type } = ctx.request.body

    if(!user_id) {
        ctx.body = getErrObj({
            data: "id不能为空"
        })
        return
    }

    let res =  User.update({
        user_name, 
        user_password, 
        user_email, 
        user_type
    },{
        where: {
            user_id
        }
    })

    ctx.body = getSuccObj({
        data: res
    })
})


export default module.exports  = router