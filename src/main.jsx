import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GlobalProvider } from '@/context/GlobalContext'

import '@/styles/reset.scss'
import '@/styles/vars.scss'

import App from '@/App.jsx'
import Home from '@/routes/Home/Home.jsx'
import Membership from "@/routes/Membership/Membership"
import FAQs from "@/routes/FAQs/FAQs"
import TrackOrder from "@/routes/TrackOrder/TrackOrder"
import StoreLocations from "@/routes/StoreLocations/StoreLocations"
import Policies from "@/routes/Policy/Policy"
import Category from '@/features/Product/Category'
import ProductDetails from '@/features/Product/ProductDetails'
import Cart from '@/features/Product/Cart'
import CheckoutLayout from '@/layouts/CheckoutLayout'
import CheckoutInformation from './routes/Checkout/Information'
import CheckoutPayment from './routes/Checkout/Payment'
import OrderConfirmation from './routes/OrderConfirmation/OrderConfirmation'
import AuthLayout from '@/layouts/AuthLayout'
import Login from '@/routes/Auth/Login'
import ForgotPassword from '@/routes/Auth/ForgotPassword'
import SignUp from '@/routes/Auth/SignUp'
import Profile from '@/routes/Profile/Profile';

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
          <Route path='product/:productName' element={<ProductDetails /> }/>
          <Route path='cart' element={<Cart />}/>
          <Route path='user'>
            <Route path='profile' element={<Profile />}/>
          </Route>
          <Route path='checkout' element={<CheckoutLayout />}>
            <Route path='Information' element={<CheckoutInformation />}/>
            <Route path='Payment' element={<CheckoutPayment />}/>
          </Route>
          <Route path='order-confirmation' element={<OrderConfirmation />}/>
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
