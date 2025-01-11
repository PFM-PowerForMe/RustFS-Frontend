import type { AwsClient } from "aws4fetch"
import { joinURL } from "ufo"

class ApiClient {
  private $api: any
  private config?: { baseUrl?: string, headers?: Record<string, string> }

  constructor(api: AwsClient, options?: any) {
    this.$api = api
    this.config = options
  }

  async request(url: string, options?: any) {
    url = this.config?.baseUrl ? joinURL(this.config?.baseUrl, url) : url
    options.headers = { ...this.config?.headers, ...options.headers }
    return this.$api.fetch(url, options)
  }

  async get(url: string, options?: any) {
    return this.request(url, { method: 'GET', ...options })
  }

  async post(url: string, body: any, options?: any) {
    return this.request(url, { method: 'POST', body, ...options })
  }

  async delete(url: string, options?: any) {
    return this.request(url, { method: 'DELETE', ...options })
  }

  async put(url: string, body: any, options?: any) {
    return this.request(url, { method: 'PUT', body, ...options })
  }

  async patch(url: string, body: any, options?: any) {
    return this.request(url, { method: 'PATCH', body, ...options })
  }

  async head(url: string, options?: any) {
    return this.request(url, { method: 'HEAD', ...options })
  }

  async options(url: string, options?: any) {
    return this.request(url, { method: 'OPTIONS', ...options })
  }

  async trace(url: string, options?: any) {
    return this.request(url, { method: 'TRACE', ...options })
  }
}

export default ApiClient
