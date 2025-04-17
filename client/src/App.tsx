import './App.css'

import Main from './components/Main'
import MainHeader from './components/MainHeader'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className='h-dvh'>
      <MainHeader />
      <div className='flex flex-row h-9/10'>
          <Sidebar/>
          <Main/>
      </div>
    </div>
  )
}

export default App
