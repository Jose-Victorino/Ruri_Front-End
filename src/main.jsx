import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalProvider } from '@/context/GlobalContext';

import App from '@/App.jsx'
import '@/library/reset.scss'
import Shop from '@/components/Shop/Shop.jsx';
import Membership from "@/components/Membership/Membership"
import FAQs from "@/components/FAQs/FAQs"
import TrackOrder from "@/components/TrackOrder/TrackOrder"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Shop />}/>
          <Route path="membership" element={<Membership />}/>
          <Route path="FAQs" element={<FAQs />}/>
          <Route path="track-order" element={<TrackOrder />}/>
        </Route>
      </Routes>
    </GlobalProvider>
  </BrowserRouter>
)
