import fs from 'fs'
import path from 'path'
import { NGINX_URL, NGINX } from "../config"

export const getDate = () => {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth()
    let day = now.getDate()
    month++

    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return year + '-' + month + '-' + day
}


export const sleep = (timer) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timer)
    })
}

export const mkdirs = (dirpath) => {

    if (!fs.existsSync(path.dirname(dirpath))) {
        mkdirs(path.dirname(dirpath))
    }
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath)
    }
}

export const delFile = (ly_url) => {
    
    try{
        ly_url = ly_url.replace(NGINX_URL, "")
        ly_url = `${NGINX}/${ly_url}`

        fs.unlinkSync(ly_url)

    }catch(err) {
        
    }
}