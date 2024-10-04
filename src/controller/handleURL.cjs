const { ipcMain, BrowserWindow } = require("electron")

// 捕获网页数据
const handleURLAsync = (url) => {
  // 返回一个Promise
  return new Promise((resolve, reject) => {
    // 创建一个虚拟窗口
    const fakeWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      show: false,
      webPreferences: {
        // 离屏渲染
        offscreen: true
      }
    })
    // 加载url
    fakeWindow.loadURL(url)
    // 等待网页加载完毕
    fakeWindow.webContents.on("did-finish-load", async () => {
      try {
        // 获取网页的title
        let webTitle = fakeWindow.webContents.getTitle()
        // 为当前网页截屏并转化为url格式
        let webScreenShot = await fakeWindow.webContents.capturePage()
        let webScreenShotUrl = webScreenShot.toDataURL()
        // 判断取回的网站快照是否为空
        if (!webScreenShot.isEmpty()) {
          // 如果快照不为空
          // 成功获取数据时resolve
          resolve({
            url,
            webTitle,
            webScreenShotUrl
          })
        } else {
          // 如果快照为空
          resolve({
            msg: "无效的网址!"
          })
        }
      } catch (error) {
        // 失败时reject
        reject(error)
      }
    })
  })
}

// 处理渲染进程传递的url参数
const handleURL = () => {
  ipcMain.handle("on-url-evt", async (evt, url) => {
    let res = await handleURLAsync(url)
    return res
  })
}
module.exports = handleURL