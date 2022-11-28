import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";

import { ElMessage, ElLoading } from "element-plus";

import { appStore } from "@/store/appStore"
import { storeToRefs } from 'pinia'
let { userInfo } = storeToRefs(appStore());

const state = {
  ok: 0,//请求成功状态码
  401: "ERR_BAD_REQUEST"
};

//返回数据规则
interface IResponseData<T> {
  status: number;
  message?: string;
  data: T;
  code: string;
}



//默认配置
const config = {
  baseURL: "",
  timeout: 30 * 1000,
  withCredentials: true,
};

let loading: any;

class Http {

  axiosInstance;  //定义了一个axiosInstance属性，未来它放的是一个axios实例

  constructor(config: any) {
    //实例化请求配置
    this.axiosInstance = axios.create(config);

    // 添加请求拦截器
    this.axiosInstance.interceptors.request.use(

      //在发送请求之前做些什么
      (config: AxiosRequestConfig) => {

        // 在发送请求之前做了一个loading
        loading = ElLoading.service({
          lock: true,
          text: '加载中...',
          background: 'rgba(0, 0, 0, 0.7)',
          fullscreen: true
        })
        // 处理token
        if(userInfo.value.token != ""){
          let headers = config.headers as AxiosResponseHeaders
          headers.Authorization = userInfo.value.token
        }
       

        return config;


      },
      //失败
      (error: any) => {
        loading.close();
        // 对请求错误做些什么
        return Promise.reject(error);
      }


    );

    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      loading.close();

      let apiData = response.data;

      const { code, message, data } = apiData;

      if (code === undefined) {
        return apiData;
      }
      else if (code === 0) {

        return data;

      } else {

        ElMessage.error(message)

      }
      return apiData.data;
    }, function (error) {
      // 对响应错误做点什么
      loading.close();
      return Promise.reject(error);
    });


  }

  get<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.get(url, { params, ...data });
  }

  post<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.post(url, params, data);
  }

  put<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.put(url, params, data);
  }
  patch<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.patch(url, params, data);
  }
  delete<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.axiosInstance.delete(url, { params, ...data });
  }
}

export default new Http(config);
