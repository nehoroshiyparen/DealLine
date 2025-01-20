import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { Provider } from 'react-redux'
import store from './store/store'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from './store/userSlice'
import { AppDispatch, RootState } from './store/store'
import { useSelector } from 'react-redux'

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
