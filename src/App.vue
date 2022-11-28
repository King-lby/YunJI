
<template>

  <!-- 需要框架包起来的就用下面这个div1 -->
  <div id="div1" v-if="$route.meta.useFrame">
    <div class="common-layout">
      <el-container>
        <el-header class="header">

          <el-row :gutter="20">
            <el-col :span="6">
              <el-row>
                <el-col :span="4"> <img src="/images/logo.svg" class="logo" alt="管理系统" /> </el-col>
                <el-col :span="20">云迹</el-col>
              </el-row>

            </el-col>
            <el-col :span="10">

            </el-col>
            <el-col :span="8" class="userinfo">
              <el-icon>
                <User />
              </el-icon>
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{userInfo.nickName}}
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>

                    <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>

        </el-header>
        <el-container>
          <el-aside :width="menuWidth" style="height:calc(100vh - 70px)">
            <Menu></Menu>
          </el-aside>
          <el-main>

            <NavHead></NavHead>
            <router-view>        
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>

  <!-- 不需要框架包起来的就用下面这个div2 -->
  <div id="div2" v-if="!$route.meta.useFrame">
    <router-view></router-view>
  </div>


</template>

<script  setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'
import NavHead from '@/components/NavHead.vue'
import PubSub from 'pubsub-js'
import jwtDecode from 'jwt-decode'
import { appStore } from "@/store/appStore"
import { storeToRefs } from 'pinia'
let { userInfo } = storeToRefs(appStore());

const menuWidth = ref("200px");

//当前路由
const route = useRoute()
//路由管理器
const router = useRouter()


onMounted(() => {

  PubSub.subscribe('menuopenorclose', (topic: string, data: any) => {
    menuWidth.value = data == true ? "64px" : "200px"
  })

//接受登陆成功的消息事件,消费者
PubSub.subscribe('login-ok', (topic: string, data: any) => {
       let token = data;
       const tokenObject:any = jwtDecode(token)
       userInfo.value.nickName = tokenObject.nickName
 
       userInfo.value.userId = tokenObject.userId

    })


})

const logout = () => {
  userInfo.value.userId = 0
  userInfo.value.nickName = "游客"
  router.push({ name: "login" })

}


</script>
<style scoped>
.el-header {
  background-color: #708090;
}

.el-aside {

  height: 500px;
}

.header {
  align-items: center;
  vertical-align: middle;
  padding-top: 15px;
  color: white;

}

.userinfo {

  text-align: right;
}

.el-dropdown-link {
  color: white;
}

.el-main {

  --el-main-padding: 10px 20px;
  background-color: #f9f6f6cc;
}
</style>
