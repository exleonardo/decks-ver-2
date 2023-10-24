import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { useAppSelector } from './store.ts'
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx'
import { selectAppStatus } from './app-selectors.ts'
import * as React from 'react'
import { ReactNode } from 'react'

export const App = () => {
const status = useAppSelector(selectAppStatus)
  return (
    <div>
      <List item={['HTML',"CSS"]} renderItem={(item:string)=>item.toUpperCase()}/>
      <List item={[1,2,4]} renderItem={(item:number)=>item.toFixed()}/>
      {status==='loading' &&<LinearLoader/>}
      <Decks />
      <GlobalError />
    </div>
  )
}

type ListType<D> = {
  item:D[]
  renderItem:(item:D)=>ReactNode
}
function List <D>(props:ListType<D>){
  return (
    <ul>
      {props.item.map((el,index)=> <li key={index}>{props.renderItem(el)}</li>)}
    </ul>
  )
}