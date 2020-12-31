/*
 * @Author: your name
 * @Date: 2020-11-26 09:41:52
 * @LastEditTime: 2020-11-26 15:15:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\index.js
 */

import puppeteer from "puppeteer"
import { sleep } from "../utils/index"
import colors from "colors/safe"


import Model from "../mysql/model/index"


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
    
    // 进入36kr
    {
        const page = await browser.newPage()
        await page.goto("https://36kr.com/information/web_news/latest", {
            waitUntil: "networkidle2"
        })
        
        await sleep(1000)

        // 初始化元素下标
        let index = 0

        async function saveData(page1) {
            
            // 获取数据
            let data = await page1.evaluate(() => {
                        
                let title = document.querySelector(".article-mian-content .article-wrapper h1.article-title")
                let user = document.querySelector(".article-mian-content .article-wrapper a.title-icon-item")
                let summary = document.querySelector(".article-mian-content .article-wrapper div.summary")
                let details = document.querySelector(".article-mian-content .article-wrapper div.articleDetailContent")

                return {
                    title: title.innerHTML,
                    user_name: user.innerHTML,
                    user_id: user.href.replace("/user/", "").replace("https://36kr.com", ""),
                    summary: summary.innerHTML,
                    details: details.innerHTML,
                }
            })



            await Model.Article36kr.create({
                title: data.title,
                summary: data.summary,
                details: data.details,
                user_name: data.user_name,
                user_id: data.user_id,
                date: Date.now()
            })

        }   

        // 查询数据
        async function getList() {
            
            // 文章链接集合
            let urls = await page.evaluate(() => {
                let items = document.querySelectorAll(".kr-layout-content a.article-item-title")

                let urls = []
                items.forEach(element => {
                    urls.push(element.href)
                })

                return urls
            })

            await sleep(1000)
            
            // 循环页面的元素 进入详情页面
            for(let i = index; i < urls.length; i++) {
                const page1 = await browser.newPage()
                
                try{
                    await page1.goto(urls[i], {
                        waitUntil: "load"
                    })
                    console.log(colors.green(urls[i]))

                    // 保存数据
                    saveData(page1)

                }catch(err) {
                    console.log(colors.red(err))
                }
                await sleep(1000)

                page1.close()
                await sleep(1000)
            }
            // 给标签赋值
            index = urls.length

            console.log(colors.yellow(`已经加载了${index}条数据了`))

            // 下拉到底部滚动
            await page.evaluate(() => {
                window.scrollTo(0,100000)
            })

            await sleep(2000)

            // 判断下拉到底部是否是加载了数据   返回当前页面的文件数量
            let next = await page.evaluate(() => {

                let items = document.querySelectorAll(".kr-layout-content a.article-item-title")
                let urls = []
                items.forEach(element => {
                    urls.push(element.href)
                })

                return urls
            })
            
            // 如果是下拉滚动加载数据
            if(next.length > index) {
                getList()
                return
            }

            try{
                // 点击加载更多
                await page.click(".kr-layout-content .kr-loading-more-button.show")
                await sleep(2000)
                getList()
            }catch(err) {
                // 查看 最新推荐创投Markets汽车科技企服金融生活创新房产职场会员其他

                let typeUrls = await page.evaluate(() => {
                    let items = document.querySelectorAll(".kr-information-left .kr-information-channel a")
        
                    let urls = []
                    items.forEach(element => {
                        urls.push(element.href)
                    })
        
                    urls.splice(0, 1)
        
                    return urls
                })
    
                for (let i = 0; i < typeUrls.length; i++) {
                    
                    await page.goto(`https://36kr.com/${typeUrls[i]}`, {
                        waitUntil: "networkidle2"
                    })
    
                    await sleep(1000)
                    // 初始化元素下标
                    index = 0
    
                    
                    getList()
                }
                
                console.log(colors.red(err))
                browser.close()
                return
            }
        }
        
        getList()
    }
})()



