const fs = require("node:fs")
const path = require("node:path")
const { ipcMain } = require("electron")

// 读取文件夹中的图片名称列表
ipcMain.handle("on-read-imgs", () => {
  return new Promise((resolve, reject) => {
    // 读取指定文件夹中的文件
    const pathLink = path.resolve(__dirname, "../../public")
    fs.readdir(pathLink, (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })
})