import $http from '../index'

export const postLogin = (requestData: any) => {
  return $http(requestData)
}