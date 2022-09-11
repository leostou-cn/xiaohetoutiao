import type { AxiosRequestHeaders } from 'axios'

export default interface RequestType {
  url: string,
  method: string,
  data: object | undefined,
  params: object | undefined,
  headers: AxiosRequestHeaders
}