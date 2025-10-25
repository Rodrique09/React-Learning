import {Routes , Route} from 'react-router'
import { HomePage } from './pages/Homepage'
import './App.css'
import './index.css'

const App = () =>{

  return (
    <Routes>
      <Route path = "/" element = {<HomePage />} />
      <Route path = "checkout" element =  {<div>This is a test checkout element</div>} />
    </Routes>
  )
}

export default App
