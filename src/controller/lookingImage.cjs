const { ipcMain, shell } = require("electron")
const path = require("node:path")

ipcMain.handle("on-looking-image", (e, file) => {
  shell.showItemInFolder(path.resolve(__dirname, "../../public/" + file))
})