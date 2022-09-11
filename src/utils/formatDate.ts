import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'

dayjs.extend(relativeTime)
dayjs.locale('zh')

/**
 * 
 * @param date Date
 * @returns timeAgo:string
 */
export const formatFromNow = (date: string) => {
  return dayjs(date).fromNow()
}