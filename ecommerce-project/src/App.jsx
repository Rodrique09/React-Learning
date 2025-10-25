import {Routes , Route} from 'react-router'
import { HomePage } from './pages/Homepage'
import { CheckoutPage } from './pages/CheckoutPage'
import './App.css'
import './index.css'

const App = () =>{

  return (
    <Routes>
      <Route path = "/" element = {<HomePage />} />
      <Route path = "checkout" element =  {<CheckoutPage/>} />
    </Routes>
  )
}

export default App
