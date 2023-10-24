import { isAxiosError } from 'axios'
import { setAppError } from '../../app/app-reducer.ts'
import { Dispatch } from 'redux'
type ServerError = {
  errorMessages : Array<{
    message:string,
    field:string
  }>
}
export const handleError = (e:unknown,dispatch:Dispatch)=>{
  let errorMessage;
  if(isAxiosError<ServerError>(e)){
    errorMessage = e.response?
      e.response.data.errorMessages[0].message  //ошибка с сервера
      :e.message // ошибка на клиенте
  }else {
    errorMessage = (e as Error).message
  }
  dispatch(setAppError(errorMessage))
}
