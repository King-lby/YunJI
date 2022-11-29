import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port:5001,//自定义端口号
    proxy: {
      "/yunji-api": {
        target: "https://www.fastmock.site/mock/9f7ebb6e301e84895aa1f53cf9e081bc",
        changeOrigin: true,
      
      },
    },
  },
  
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
})
