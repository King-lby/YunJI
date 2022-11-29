<template>
  
    <!-- {{name}}
    <el-image style="width: 100px; height: 100px" :src="url" /> -->
  
    {{girl.name}}
    <el-image style="width: 100px; height: 100px" :src="girl.url" />

  
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue'
  
  import { girlApi } from "@/api/index";
  
  //const name = ref('无名')
  //const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
  
  
  
  const girl = reactive({
    name:"无名",
    url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  })
  
  onMounted(() => {
      girlApi.select.call().then((resonse:any) => {
   
         // url.value = resonse.url
         // name.value = resonse.name
  
         girl.name = resonse.name
         girl.url =  resonse.url
  
      })
  })
  
  </script>
  <style scoped>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .el-dropdown {
    margin-top: 1.1rem;
  }
  </style>