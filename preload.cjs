const { ipcRenderer, contextBridge } = require("electron")

// 与主进程通信,获取网站数据
const sendUrl = async (url) => {
  let res = await ipcRenderer.invoke("on-url-evt", url)
  return res
}

// 系统提示框
const showDialog = (msg) => {
  ipcRenderer.invoke("on-dialog-evt", msg)
}

// 打开新窗口
const openNewWindow = async (url) => {
  await ipcRenderer.invoke("on-newWindow-evt", url)
}

// 读取文件夹图片列表
const readImagesList = async () => {
  let res = await ipcRenderer.invoke("on-read-imgs")
  return res
}

// 删除图片时打开提示框
const showImageDialog = () => {
  return ipcRenderer.invoke("on-img-dialog")
}

// 删除选中的文件
const delImage = (file) => {
  ipcRenderer.invoke("on-del-img", file)
}

// 查看图片
const lookingImage = (file) => {
  ipcRenderer.invoke("on-looking-image", file)
}

// 主进程传递的事件
const openAddlistModel = (cb) => {
  ipcRenderer.on("on-add-weblist", () => {
    cb()
  })
}

contextBridge.exposeInMainWorld("myApi", {
  sendUrl,
  showDialog,
  openNewWindow,
  readImagesList,
  showImageDialog,
  delImage,
  lookingImage,
  openAddlistModel
})