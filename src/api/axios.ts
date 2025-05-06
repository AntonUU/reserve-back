import axios, {AxiosResponse} from 'axios';
import {onMounted, ref} from "vue";

let baseURL = 'http://localhost:8000';

// 创建axios实例
const instance = axios.create({
    baseURL: baseURL, // 设置基础URL
    timeout: 5000, // 设置超时时间
    headers: {'X-Custom-Header': 'foobar'} // 自定义请求头
});


// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么，例如添加token
    return config;
}, error => {
    // 处理请求错误
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response;
}, error => {
    // 处理响应错误
    return Promise.reject(error);
});

export function get(uri, params): Promise<AxiosResponse<any>>{
    return instance.get(uri, {
        'params': params,
        'timeout': 3000
    }).then(result => {
        return result.data;
    })
}

export function post(uri, data): Promise<AxiosResponse<any>>{
    return instance.post(uri, data, {
        'timeout': 3000
    }).then(result => {
        return result.data;
    })
}