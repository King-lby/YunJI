<template>

 

    <el-menu default-active="/" :collapse="isCollapse" :collapse-transition="false" class="el-menu-vertical-demo" :router="true" active-text-color="#ffd04b"
        background-color="#545c64" text-color="#fff">

        <template v-for="(item1, index1) in $router.options.routes">

            <!-- 有二级节点 -->
            <el-sub-menu v-if="item1.meta.show  && item1.children?.length > 0" :index="item1.path">
                <template #title>
                    <component :is="item1.meta.icon" class="menuicon"></component>
                    <span>{{item1.meta.title}}</span>
                </template>

                <template v-for="(item2,index2) in item1.children">
                    <el-menu-item :index="item2.path" v-if="item2.meta.show==true">
                        <component :is="item2.meta.icon" class="menuicon"></component>
                        {{item2.meta.title}}
                    </el-menu-item>
                </template>

            </el-sub-menu>

            <!-- 只有一级节点 -->
            <el-menu-item :index="item1.path" v-if="item1.meta.show  && item1.children == null">
                <component :is="item1.meta.icon" class="menuicon"></component>
                <span>{{item1.meta.title}}</span>
            </el-menu-item>


        </template>

    </el-menu>
    <el-row class="btbg">
        <el-col :offset="9" :span="6">
            <el-icon @click="openOrClose" v-if="!isCollapse">
                <Fold />
            </el-icon>
            <el-icon @click="openOrClose" v-if="isCollapse">
                <Expand />
            </el-icon>
        </el-col>
    </el-row>
</template>

<script  setup lang="ts">

import { ref,onMounted } from 'vue'
import PubSub from 'pubsub-js' 
import { appStore } from "@/store/appStore"
import { storeToRefs } from 'pinia'
let { menuCollapse } = storeToRefs(appStore());

const isCollapse = menuCollapse;
onMounted(()=>{
    PubSub.publish('menuopenorclose', isCollapse.value)
})
const openOrClose = ()=>{
    isCollapse.value = !isCollapse.value;
    PubSub.publish('menuopenorclose', isCollapse.value)

}

</script>
<style scoped>
.menuicon {
    width: 16px;
    height: 16px;
    padding-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 90%;
  min-height: calc(100vh - 150px); 
}
.el-menu--collapse {

     min-height: calc(100vh - 150px); 
}
.btbg{
    background-color:#545c64;
    color:white;  cursor: pointer;
    margin-right: 1px;
    height: 50px; padding-top: 10px;
   
}
</style>