const { app, BrowserWindow, session } = require("electron")
const path = require("node:path")
const handleURL = require("./src/controller/handleURL.cjs")
const showDialog = require("./src/controller/dialog.cjs")
require("./src/controller/newWindow.cjs")
require("./src/controller/readImgFiles.cjs")
require("./src/controller/delImageItem.cjs")
require("./src/controller/lookingImage.cjs")
// 引入创建window原生菜单模块
const createMenu = require("./src/controller/menuList.cjs")

// 使用窗口状态管理
const WinState = require("electron-win-state").default

// 设置窗口默认参数
const winState = new WinState({
  defaultWidth: 1000,
  defaultHeight: 800,
  electronStoreOptions: {
    name: "new-main-window"
  }
})

const createWindow = () => {
  const win = new BrowserWindow({
    // 解构状态参数
    ...winState.winOptions,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs")
    }
  })
  win.loadURL("http://localhost:5173/")
  // win.webContents.openDevTools()
  // win.setMenuBarVisibility(false)
  // 开启窗口状态管理
  winState.manage(win)
  // 创建菜单
  createMenu(win)
  // 处理url
  handleURL()
  // 开启窗口提示
  showDialog()
}

app.whenReady().then(async () => {
  try {
    // 配置vue devTools工具
    const vueDevToolsPath = path.join(__dirname, "./devTool/olofadcdnkkjdfgjcmjaadnlehnnihnl/6.6.3_0")
    await session.defaultSession.loadExtension(vueDevToolsPath)
  } catch (e) {
    console.log(e);
  }
  createWindow()
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows.length === 0) createWindow()
  })
})
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})