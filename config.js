/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-12-02 16:32:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\config.js
 */
export const NGINX = process.env.NODE_ENV === "development" ? "D:\\111code\\image" : "C:/Users/Administrator/Desktop/nginx-1.18.0/html"  

export const CORS_URL = ["http://localhost:9528", "http://localhost:9529", "http://localhost:3000","http://localhost:4000","119.39.102.188", "http://www.gzzefu.com", "http://gzzefu.com", "http://staitc.gzzefu.com", "http://admin.gzzefu.com", "https://www.gzzefu.com", "https://gzzefu.com", "https://staitc.gzzefu.com", "https://admin.gzzefu.com"]

export const NGINX_URL = process.env.NODE_ENV === "development" ? "http://localhost:8089" : "https://static.gzzefu.com"   //服务器

export const secretOrPrivateKey="ly_website" // 这是加密的key（密钥） 

export const getSuccObj = (obj) => {
    if(!obj.data) {
        throw "data是必须要传的"
    }
    return {
        data: obj.data,
        msg: obj.msg || "操作成功",
        code: obj.code || 200,
    }
}

export const getErrObj = (obj) => {
    if(!obj.data) {
        throw "data是必须要传的"
    }
    return {
        data: obj.data,
        msg: obj.msg || "操作失败",
        code: obj.code || -1,
    }
}