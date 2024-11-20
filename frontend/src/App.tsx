import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Menu from './components/menu/menu'
import Path from './components/path/path.tsx'

function App() {
  return (
    <BrowserRouter>
      <div className='positioning-grid'>
        <Menu/>
        <Path/>
        <AppRouter/>
      </div>
    </BrowserRouter>
  )
}

export default App
