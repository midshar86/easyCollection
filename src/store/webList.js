import { defineStore } from "pinia"
import store from "store2"

const useWebListStore = defineStore("weblist", {
  state: () => {
    return {
      // 初始化web列表
      webList: store.get("weblist") ? store.get("weblist") : [],
      // 存放搜索字符串
      searchStr: ""
    }
  },
  actions: {
    // 添加一项web列表项
    addWebsite(webInfo) {
      this.webList.unshift(webInfo)
      // 在localStorage中存储列表
      store.set("weblist", this.webList)
    },
    // 删除指定的web列表项
    delWebSite(url) {
      let idx = this.webList.findIndex(item => item.url === url)
      this.webList.splice(idx, 1)
      // 将数据同步更新至内存中
      store.set("weblist", this.webList)
    },
    // 更改查找的网址
    changeSearchUrl(str) {
      this.searchStr = str
    }
  },
  getters: {
    // 筛选包含特定字符串的web项
    filterWebsite() {
      return this.webList.filter(item => item.webTitle.includes(this.searchStr))
    }
  }
})

export default useWebListStore