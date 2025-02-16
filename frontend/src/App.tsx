import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </BrowserRouter>
  )
}

export default App
