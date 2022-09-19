export interface chatStoreType {
  socket: any,
  chatList: Array<{ name: string, msg: string }>
}
export interface UpDataChatListType{
  name: string,
  msg:string
}