
import { defineStore } from 'pinia'

export const appStore = defineStore({
  id: 'scmapp',
  state:()=>{
  	return {
            userInfo:{
              userId:0,
              nickName:'张三',        
            },
            menuCollapse: false,
            tabList:[{
              title: '首页',
              name: 'home',
              closable: false
            },],
            activeName:"home" 
       
         
  	       }
  },
  getters:{

  },
  actions:{
  	
  },
    // 开启数据持久
    persist: {
        enabled: true,
        strategies: [
            {
              key: 'yunji_app',
              storage: localStorage,
            }
          ]
      }
})
