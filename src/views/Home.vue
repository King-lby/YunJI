<template>

    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>欢迎使用云迹系统</span>

            </div>
        </template>
        <div class="text">
               云迹是一套基于场所码数据分析的一套疫情防控看板，集“场所码”，“商店码”，“街道码”多方位数据收集、跟踪、分析于一体的实时性大数据看板，为疫情防控提供可靠的及时数据，对未来趋势预测提供数据基础。
            <br/>
           系统包括场所码生成、人员信息采集，大数据分析等模块，该系统基于真实开发流程，采用企业级敏捷开发平台，分布式微服务架构。从需求梳理，迭代规划，编码实现，压力测试,
            代码合并，自动化部署等流程完成实战开发。 <br/>
            <div class="img">
                <img
          src="/images/ma.png"
          class="image"
        />
        <!-- 测试 -->
            </div>
        </div>
    </el-card>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { girlApi } from "@/api/index"
onMounted(() => {
    girlApi.select.call().then((res: any) => {
        console.table(res)
    })
})
</script>


<style>
.text{
    color: #000;
    line-height: 25px;
}
.img{
    text-align: center;
}
</style>
