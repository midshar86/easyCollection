const { ipcMain, dialog } = require("electron")
const fs = require("node:fs")
const path = require("node:path")

// 弹出提示框
ipcMain.handle("on-img-dialog", () => {
  return dialog.showMessageBox({
    title: "警告",
    type: "warning",
    buttons: ["删除", "取消"],
    message: "确认删除当前内容?",
    cancelId: 1
  })
})

// 删除选中的图片
ipcMain.handle("on-del-img", (e, file) => {
  const delImgPath = path.resolve(__dirname, `../../public/${file}`)
  console.log(delImgPath);
  fs.unlink(delImgPath, (err) => {
    if (err) {
      console.log("文件删除失败");
    }
    dialog.showMessageBox({
      type: "info",
      title: "提示",
      message: "图片删除成功!"
    })
  })
})