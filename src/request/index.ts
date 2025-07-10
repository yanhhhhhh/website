'use client';
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from '@/providers';

const baseUrl = process.env.VITE_APP_BASE_API;

export type Result<T> = {
  code: number;
  msg: string;
  data: T;
};

export type PageResult<T> = {
  code: number;
  msg: string;
  data: {
    list: T[];
    total: number;
    pageNum: number;
    pageSize: number;
  };
};

interface SelfConfig {
  skipErrorMessage?: boolean;
}

type Config = SelfConfig & AxiosRequestConfig;

export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: Config = {
    timeout: 60000,
    adapter: 'fetch',
    // 修复雪花ID 16位数字精度丢失问题
    // transformResponse: [
    //   function (data) {
    //      // 如果返回的是Blob类型的则return
    //   if (data instanceof Blob) {
    //     return data;
    //   }
    //     //https://juejin.cn/post/7115600011479482404
    //     //fix: 修复后端返回的数据中有数字超过16位时，精度丢失的问题
    //     // 加冒号是防止替换到非字段的值
    //     // console.log(data, "data");
    //     data = data.replace(/:([0-9]{16,})/g, (a: any, b: string) => {
    //       return `:"${b}"`;
    //     });
    //     // 判断能被JSON.parse()的数据
    //     const flag = /^{.+}$/.test(data);
    //     //  console.log({flag},JSON.parse(data))
    //     return flag ? JSON.parse(data) : {};
    //   },
    // ],
  };

  constructor(config: Config) {
    // 使用axios.create创建axios实例

    this.instance = axios.create(Object.assign(this.baseConfig, config));
    this.instance.interceptors.request.use(
      (config) => {
        //接口国际化
        config.url = baseUrl + config.url;
        const lang =
          localStorage.getItem('i18nextLng')?.toLowerCase() || 'zh_CN';
        if (!config.headers['lang']) {
          config.headers['lang'] = lang;
        }

        return config;
      },
      (err: any) => {
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res;
      },
      (err) => {
        if (err.message === 'Network Error') {
          // 这里可以跳转到网络错误页面
          // window.location.replace('/network_error');
        }
        if (err.config?.skipErrorMessage) throw err.response.data;
        let msg = '';
        if (!err.response) return Promise.reject(err);
        // 这里用来处理http常见错误，进行全局提示
        switch (err.response.status) {
          case 400:
            msg = '请求错误(400)';
            break;

          case 403:
            msg = '拒绝访问(403)';
            break;
          case 404:
            msg = '请求出错(404)';
            break;
          case 408:
            msg = '请求超时(408)';
            break;
          case 500:
            msg = '服务器错误(500)';

            break;
          case 501:
            msg = '服务未实现(501)';
            break;
          case 502:
            msg = '网络错误(502)';
            break;
          case 503:
            msg = '服务不可用(503)';
            break;
          case 504:
            msg = '网络超时(504)';
            break;
          case 505:
            msg = 'HTTP版本不受支持(505)';
            break;
          default:
            msg = `连接出错(${err.response.status})!`;
        }
        // 这里错误消息可以使用全局弹框展示出来
        message.error(err.response.data?.message || msg);

        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request<T = any>(config: Config): Promise<AxiosResponse<T>> {
    return this.instance.request(config);
  }

  public get<T = any>(url: string, config?: Config): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: Config
  ): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: Config
  ): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: Config
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }
}
const request = new Request({});

const authRequest = new Request({
  headers: {
    // Authorization: `${localStorage.getItem('token')}`,
  },
});
// 拦截器 加token
authRequest.instance.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = `${localStorage.getItem('token')}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 默认导出Request实例
export default request;
export { request, authRequest };
