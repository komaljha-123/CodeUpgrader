import { useState } from 'react'
import './App.css'
import UpgradeCodebase from './component/UpgradeCodebase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UpgradeCodebase />
    </>
  )
}

export default App
