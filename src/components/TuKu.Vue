<template>


    <el-upload class="avatar-uploader" :show-file-list="false" :on-change="onChange" :auto-upload="false">
      <img v-if="imageData.imgBase64 != ''" :src="imageData.imgBase64" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  
    <el-divider border-style="dotted" />
    <el-row :gutter="20">
      <el-col v-for="(item, index) in imgList">
  
        <el-image style="width: 100px; height: 100px" :src="item.img" />
  
      </el-col>
    
    </el-row>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue'
  import {tukuApi} from "@/api/index";

  import { ElMessage } from 'element-plus'
  const imageData = reactive({
    imgBase64: " ",
    imgName: " "
  })
  const imgList = ref([])
  
  const onChange = (uploadFile: any, uploadFiles: any) => {
  
  
    let reader = new FileReader();
  
    reader.readAsDataURL(uploadFile.raw)
  
    reader.onload = () => {
  
      imageData.imgBase64 = reader.result
  
      imageData.imgName = uploadFile.name
  
      uploadImg()
  
    }
  }
  
  const uploadImg = () => {
  
    tukuApi.upload.call({ name: imageData.imgName, base64: imageData.imgBase64 }).then((response: any) => {
  
  
      if (response === 1) {
  
        ElMessage({
          message: '上传成功.',
          type: 'success',
        })
        callImgApi()
  
        imageData.imgBase64 = ""
  
      }
    })
  }
  
  const callImgApi = () => {
    tukuApi.select.call().then((response: any) => {
  
      imgList.value = response
  
    })
  }
  
  onMounted(() => {
    callImgApi()
  })
  
  </script>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.img {
  width: 100px;
  height: 100px;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  padding: 2px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  border: 1px dashed var(--el-border-color);
  cursor: pointer;
}

.demo-image {
  border-radius: 0.2rem;
  width: 100px;
  height: 100px;
  cursor: pointer;


}

.el-col-24 {
  flex: 0 0 0%;
}
</style>