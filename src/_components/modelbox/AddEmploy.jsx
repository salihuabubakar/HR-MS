import React from 'react'
import { useGlobalState, setGlobalState } from '../../context/GlobalState'

export default function AddEmploy() {
  return (
    <div onClick={() => setGlobalState("showModal", false)}>AddEmploy</div>
  )
}
