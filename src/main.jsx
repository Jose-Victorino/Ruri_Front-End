import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalProvider } from '@/context/GlobalContext';

import App from '@/App.jsx'
import '@/library/reset.scss'
import Shop from '@/components/Shop/Shop.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Shop />}/>
        </Route>
      </Routes>
    </GlobalProvider>
  </BrowserRouter>
)
