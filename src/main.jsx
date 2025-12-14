import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalProvider } from '@/context/GlobalContext';

import '@/library/reset.scss'
import '@/library/vars.scss'

import App from '@/App.jsx'
import Home from '@/components/Shop/Home.jsx'
import Membership from "@/components/Membership/Membership"
import FAQs from "@/components/FAQs/FAQs"
import TrackOrder from "@/components/TrackOrder/TrackOrder"
import Category from '@/components/Shop/Category'
import Product from '@/components/Shop/Product'
import AuthLayout from '@/components/Auth/AuthLayout'
import Login from '@/components/Auth/Login'
import ForgotPassword from '@/components/Auth/ForgotPassword'
import SignUp from '@/components/Auth/SignUp'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}/>
          <Route path='membership' element={<Membership />}/>
          <Route path='FAQs' element={<FAQs />}/>
          <Route path='track-order' element={<TrackOrder />}/>
          <Route path='category/:categoryName' element={<Category />}/>
          <Route path='product/:productName' element={<Product /> }/>
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />}/>
          <Route path='login/forgot-password' element={<ForgotPassword />}/>
          <Route path='sign-up' element={<SignUp />}/>
        </Route>
      </Routes>
    </GlobalProvider>
  </BrowserRouter>
)
