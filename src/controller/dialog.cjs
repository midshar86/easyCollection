const { dialog, ipcMain } = require("electron")

// 处理重复添加的url
const showDialog = () => {
  ipcMain.handle("on-dialog-evt", (evt, msg) => {
    dialog.showMessageBox({
      message: msg,
      type: "error",
      title: "错误提示"
    })
  })
}

module.exports = showDialog