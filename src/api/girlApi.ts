import http from "@/http/index"

export default {

    select: {
        name: "查询",
        url: "/yunji-api/mygirlfriend",
        call: async function (params: any = {}) {
            return await http.get(this.url, params);
        }
    },
}
