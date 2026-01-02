import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext'

import '@/library/reset.scss'
import '@/library/vars.scss'

import App from '@/App.jsx'
import Home from '@/components/Shop/Home.jsx'
import Membership from "@/components/Membership/Membership"
import FAQs from "@/components/FAQs/FAQs"
import TrackOrder from "@/components/TrackOrder/TrackOrder"
import StoreLocations from "@/components/StoreLocations/StoreLocations"
import Policies from "@/components/Policy/Policy"
import Category from '@/components/Shop/Category'
import Product from '@/components/Shop/Product'
import Cart from '@/components/Shop/Cart'
import CheckoutLayout from '@/components/Checkout/Layout'
import CheckoutInformation from './components/Checkout/Information'
import CheckoutPayment from './components/Checkout/Payment'
import AuthLayout from '@/components/Auth/AuthLayout'
import Login from '@/components/Auth/Login'
import ForgotPassword from '@/components/Auth/ForgotPassword'
import SignUp from '@/components/Auth/SignUp'
import Profile from '@/components/User/Profile';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}/>
          <Route path='membership' element={<Membership />}/>
          <Route path='faqs' element={<FAQs />}/>
          <Route path='track-order' element={<TrackOrder />}/>
          <Route path='store-locations' element={<StoreLocations />}/>
          <Route path='policies' element={<Policies />}/>
          <Route path='category/:categoryName' element={<Category />}/>
          <Route path='product/:productName' element={<Product /> }/>
          <Route path='cart' element={<Cart />}/>
          <Route path='user'>
            <Route path='profile' element={<Profile />}/>
          </Route>
          <Route path='checkout' element={<CheckoutLayout />}>
            <Route path='Information' element={<CheckoutInformation />}/>
            <Route path='Payment' element={<CheckoutPayment />}/>
          </Route>
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
