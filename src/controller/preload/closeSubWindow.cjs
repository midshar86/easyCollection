const { ipcRenderer, contextBridge } = require("electron")

// 触发主进程中的关闭窗口
const closeSubWindow = () => {
  ipcRenderer.invoke("on-close-subWindow")
}

contextBridge.exposeInMainWorld("myApi", {
  closeSubWindow
})