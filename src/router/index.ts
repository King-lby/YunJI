import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/Home.vue"),
        meta:{ title:"首 页" ,icon:"HomeFilled",show:true,useFrame:true}
    },
 
    {
        path: '/venue',
        name: 'venue',
        component: () => import("@/views/venue/Index.vue"),
        meta:{ title:"场所管理" ,icon:"OfficeBuilding",show:true,useFrame:true},
        children: [
     
            {
                path: '/venue/add',
                name: 'venue-add',
                component: () => import("@/views/venue/Add.vue"),
                meta:{ title:"添加场所",icon:"LocationFilled" ,show:true,useFrame:true},
             },
            {
               path: "/venue/list",
               name: 'venue-list',
               component: () => import("@/views/venue/List.vue"),
               meta:{ title:"场所列表",icon:"Guide",show:true ,useFrame:true},
            },
      
        ]
    },

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router