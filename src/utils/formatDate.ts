import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'



/**
 * 
 * @param date Date
 * @returns timeAgo:string
 */
export const formatFromNow = (date: string) => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  return dayjs(date).fromNow()
}

export const formatYMD = (date: string) => {
  return dayjs(date).format().split('T')[0].split('-')
}