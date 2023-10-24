import { Dispatch } from 'redux'
import { decksAPI , UpdateDeckParams } from './decks-api.ts'
import { addDeckAC , deleteDeckAC , setDecksAC , updateDeckAC } from './decks-reducer.ts'
import { setAppStatus } from '../../app/app-reducer.ts'
import { handleError } from '../../common/utils/handle-error.ts'

export const fetchDecksTC = () =>async (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading' ))

const res = await decksAPI.fetchDecks()
  try {
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatus('succeeded' ))
  } catch {
    dispatch(setAppStatus('failed' ))
  }

}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {

  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.deleteDeck ( id )
    dispatch ( deleteDeckAC ( res.data.id ) )
  }catch (e){
    handleError(e,dispatch)
  }


}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    const res = await decksAPI.updateDeck ( params )
    dispatch ( updateDeckAC ( res.data ) )
  }catch (e) {
    handleError(e,dispatch)
  }
}
