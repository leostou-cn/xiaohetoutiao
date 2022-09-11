import $http from '../index'

export const getSugSearchData = (data: any) => {
  return $http(data)
}