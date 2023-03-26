import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import { Provider } from "react-redux";
import { store } from "./app/store";
import 'antd/dist/reset.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
)
