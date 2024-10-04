const { ipcMain, BrowserWindow, Menu, dialog } = require("electron")
const WinState = require("electron-win-state").default
const path = require("node:path")
const got = require("got")
const imageType = require("image-type")
const fs = require("node:fs")

// 注入js脚本内容
const jsCode = `
  let divEle = document.createElement("div")
  divEle.innerText = "×"
  divEle.title="点击关闭网页"
  divEle.id="close-btn"
  divEle.style.cssText ="font-size:24px;width:40px;height:40px;line-height:40px;text-align:center;border-radius:50%;background-color:orangered;color:#fff;position:fixed;bottom:50px;right:50px;z-index:9999;cursor:default;"
  document.body.appendChild(divEle)
  divEle.addEventListener("click",()=>{
      window.myApi.closeSubWindow()
    })
`
// 存放新窗口实例
let newWin

// 打开一个新的网页窗口
ipcMain.handle("on-newWindow-evt", (evt, url) => {
  return new Promise((resolve) => {
    // 单个窗口状态管理工具
    const winState = new WinState({
      defaultHeight: 800,
      defaultWidth: 1400,
      electronStoreOptions: {
        name: "new-sub-window"
      }
    })
    // 创建新窗口
    newWin = new BrowserWindow({
      ...winState.winOptions,
      // 子窗口的预加载脚本
      webPreferences: {
        preload: path.join(__dirname, "preload/closeSubWindow.cjs")
      },
      show: false
    })
    // 加载对应的url地址
    newWin.loadURL(url)
    // 设置原有的菜单栏为不可见
    newWin.setMenuBarVisibility(false)
    // 当网页加载完成后,显示网页
    newWin.webContents.on("did-finish-load", () => {
      newWin.show()
      resolve(true)
    })
    // 在窗口中添加鼠标右击事件
    newWin.webContents.on("context-menu", (e, p) => {
      // 右击唤出菜单
      const menu = Menu.buildFromTemplate([
        {
          label: "图片另存为...",
          click: async () => {
            // 点击图片另存为按钮
            // 创建一个文件流
            const imgFile = await got(p.srcURL)
            // 获取图片文件流
            const imgFileBuffer = imgFile.rawBody
            // 获取文件类型
            let imgFileExt = imageType(imgFileBuffer).ext
            let fileName = Date.now()
            // 打开系统提示窗口
            dialog.showSaveDialog({
              title: "图片另存为",
              defaultPath: path.resolve(__dirname, "../../public") + "/" + fileName + "." + imgFileExt
            }).then((res) => {
              if (!res.canceled) {
                // 如果用户点击了保存按钮
                // 使用一个绝对路径写入文件
                fs.writeFileSync(res.filePath, imgFileBuffer)
              }
            }).catch()
          }
        }
      ])
      // 判断点击源是否是图片内容
      if (p.hasImageContents) {
        // 是图片源弹出右键菜单
        menu.popup()
      }
    })
    // 在新窗口中注入js代码
    newWin.webContents.executeJavaScript(jsCode)
    // 管理新窗口
    winState.manage(newWin)
  })
})

// 关闭子窗口
ipcMain.handle("on-close-subWindow", () => {
  newWin.close()
})