/*
1.请求网站数据
2.将数据保存为本地文件
*/
const http = require('https')
const fs = require('fs')
const cheerio = require('cheerio')
let url = 'https://www.qunar.com/'
let json = 'http://nodejs.org/dist/index.json/'

http
  .get(url, (res) => {
    //安全判断
    const { statusCode } = res
    const contentType = res.headers['content-type']
    console.log(statusCode, contentType)

    let err = null
    if (statusCode !== 200) {
      err = new Error('请求状态错误')
    } else if (!/text\/html/.test(contentType)) {
      err = new Error('请求类型错误')
    }

    // 若err为真，则表示上述两个判断出错
    if (err) {
      console.log(err)
      res.resume()
      return false
    }

    //数据处理
    //数据分段，只要接收数据就会触发data事件
    //chunk：每次接收的数据片段
    let rawData = ''
    res.on('data', (chunk) => {
      console.log('数据传输')
      rawData += chunk.toString('utf8')
      //console.log(chunk.toString('utf8'))
    })
    //数据传输完毕
    res.on('end', () => {
      //将请求的数据保存到本地
      //fs.writeFileSync('./web.html', rawData)
      console.log('数据传输完毕')
      // 通过cheerio进行分析
      // 将请求到的数据进行转化
      let $ = cheerio.load(rawData)
      $('img').each((index, el) => {
        console.log($(el).attr('src'))
      })
    })
  })
  .on('error', (err) => {
    console.log('请求错误')
  })

window.onload = function () {
  var oBtn = document.getElementById('btn1')
  oBtn.onclick = function () {
    alert(this.innerHTML)
  }
}
