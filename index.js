/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 15:15:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\index.js
 */

import puppeteer from "puppeteer"
import { sleep } from "./utils/index"

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        slowMo: 100,       //放慢浏览器执行速度，方便测试观察
        args: [            //启动 Chrome 的参数，详见上文中的介绍
            "–no-sandbox",
            "--window-size=1400,960"
        ],
        defaultViewport: {
            width: 1400 - 14,
            height: 960 - 130
        }
    })
    
    // 登录百度
    {
        const page = await browser.newPage()
        await page.goto("https://www.baidu.com/", {
            waitUntil: "networkidle2"
        })
        await page.type("#kw", "puppeteer", {
            delay: 50
        })

        await page.click("#su")
        await sleep(1000)

        // 查询数据
        async function getList() {
            
            let urls = await page.evaluate(() => {
                let items = document.querySelectorAll("#content_left .c-container h3.t a")
                
                let urls = []
                items.forEach(element => {
                    urls.push(element.href)
                })

                return urls
            })

            await sleep(1000)
            
            for(let i = 0; i < urls.length; i++) {
                const page1 = await browser.newPage()

                try{
                    await page1.goto(urls[i], {
                        waitUntil: "load"
                    })
                    console.log(urls[i])
                }catch(err) {
                    console.log(err)
                }
                await sleep(1000)

                page1.close()
                await sleep(1000)
            }
            
            let next = await page.evaluate(() => {
                let items = document.querySelector("#page .page-inner a.n:last-child")
                
                return items
            })

            if(next) {
                await page.click("#page .page-inner a.n:last-child")

                getList()
            }
        }

        getList()
    }
})()



