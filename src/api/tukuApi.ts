import http from "@/http/index"

export default  {

    upload:{
        name:"上传图片",
        url:"/imgserver-api/upload",
        call: async function (params:any = {}) {
             return await http.post(this.url,params);
        }

    },
    select:{
        name:"图库查询",
        url:"/imgserver-api/select",
        call: async function (params:any = {}) {
             return await http.get(this.url,params);
        }

    },
    // add:{
    //     name:"图库添加",
    //     url:"/tuku-api/tuku/add",
    //     call: async function (params:any) {
    //          return await http.post(this.url,params);
    //     }
    // },
   

}



