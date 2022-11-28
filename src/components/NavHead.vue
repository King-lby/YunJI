<template>

  <el-tabs v-model="activeName" class="demo-tabs" @tab-remove="tabRemove" @tab-change="tabChange">
    <el-tab-pane v-for="(item, index) in tabList" :label="item.title" :closable="item.closable" :name="item.name">
    </el-tab-pane>
  </el-tabs>

</template>
<script lang="ts" setup>


import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { appStore } from '@/store/appStore';
import { storeToRefs } from 'pinia';
let {activeName,tabList} = storeToRefs(appStore())
const route = useRoute()
const router = useRouter()
const tabChange = (name: any) => {
  let tab: any = tabList.value.find(item => item.name === name)
  router.push({ name: name, query: tab.queryParams })

}
const tabRemove = (deleteName: any) => {

  let oldTabList = tabList.value

  let tabListNew = tabList.value.filter(item => item.name != deleteName)
  tabList.value = tabListNew

  //删除一个标签后，要重新算激活标签
  let currentActiveName = activeName.value
  if (currentActiveName === deleteName) {
    oldTabList.forEach((item, index) => {
      if (item.name === deleteName) {
        const nextTab = oldTabList[index + 1] || oldTabList[index - 1]
        activeName.value = nextTab.name
      }

    })
  }

}

const tabAdd = (route: any) => {

  let tab: any = tabList.value.find(item => item.name === route.name)
  if (tab === undefined) {
    tabList.value.push({
      title: route.meta.title,
      name: route.name,
      closable: true,
      queryParams: route.query
    })

  } else {
  
    tab.queryParams = route.query
  }
  activeName.value = route.name
}

watch(() => route.path, (newValue, oldValue) => {
  tabAdd(route)

})
</script>