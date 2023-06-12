// Copyright 2023 Peter Chen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import axios, { type AxiosRequestConfig } from 'axios'
import config from './config.default'
import {
  requestErrorHandle,
  responseErrorHandler,
  responseInterceptor,
  setCookieInterceptor
} from './interceptors'

// 使用默认配置创建请求实例
const axiosInstance = axios.create(config)

// 添加请求拦截器
axiosInstance.interceptors.request.use(setCookieInterceptor, requestErrorHandle)
// 添加响应拦截器
axiosInstance.interceptors.response.use(responseInterceptor, responseErrorHandler)

export default function request<T>(config: AxiosRequestConfig) {
  return new Promise<IResponseBody<T>>((resolve, reject) => {
    // 加载loading
    axiosInstance<Promise<IResponseBody<T>>>(config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {
        // 隐藏loading
      })
  })
}

export function requestByPaging<T>(config: AxiosRequestConfig) {
  return new Promise<IResponseBodyByPaging<T>>((resolve, reject) => {
    // 加载loading
    axiosInstance<Promise<IResponseBodyByPaging<T>>>(config)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {
        // 隐藏loading
      })
  })
}
