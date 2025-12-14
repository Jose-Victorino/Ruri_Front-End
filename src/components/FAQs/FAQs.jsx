import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import s from './FAQs.module.scss'

const CLOSE_DELAY = 400

const FAQ_1 = [
  {
    q: 'What is Ruri Club?',
    a: <p>Ruri Club is our Community Supported Agriculture (CSA) program. By joining, you support local farmers and receive fresh, seasonal produce directly from them. Membership also provides you with discounts and access to special items.</p>
  },
  {
    q: 'How do I become a member of Ruri Club?',
    a: <p>To become a member, simply register on our website and choose the membership plan that suits you. We offer different tiers, including TREE membership for ₱3,600 annually, which provides up to 20% discounts and other benefits.</p>
  },
  {
    q: 'Are there any subscription plans available?',
    a: <><p>Yes, we offer subscription plans through Ruri Club. You can choose from various options that suit your needs, providing you with regular deliveries of fresh produce and other benefits.</p><NavLink to='/membership'>Click to learn more.</NavLink></>
  },
  {
    q: 'Do I need to register and set up an account to be able to order?',
    a: <p>Yes, registration is required. By setting up an account, you won't need to enter your information each time you order, and you can easily track your purchases and stay informed about upcoming promotions. We also recommend registering as a TREE member for an annual fee of ₱3,600 to enjoy up to 20% discounts and access to special items.</p>
  },
  {
    q: 'What are the locations of your stores?',
    a: <>
        Our stores are located at the following addresses:
        <ul className='flex-col gap-10'>
          <li>
            <b>Rural Rising Philippines - North</b><br />
            Address: Unit 22-A Congressional Ave, Project 8, QC<br />
            Landmark: Beside Mang Inasal and Petron Congressional<br />
            Contact No: 09171667787
          </li>
          <li>
            <b>Rural Rising Philippines - Central</b><br />
            Address: Unit 1C-06 Tower 1 (Retail Area), Avida Towers Centera, EDSA corner Reliance St, Mandaluyong<br />
            Landmark: Beside Binalot<br />
            Contact No: 09189087786
          </li>
          <li>
            <b>Rural Rising Philippines - South</b><br />
            Address: Alabang Town Center, Theatre Drive, Brgy Ayala Alabang, Muntinlupa<br />
            Contact No: 09688587787<br />
          </li>
        </ul>
      </>
  },
  {
    q: 'What are your store hours?',
    a: <>
      <p><b>Ruri North</b> is open most days from 11 AM to 8 PM, as it serves as our main warehouse. We also offer deliveries until 10 PM. </p>
      <p><b>Ruri Central</b> is open from Tuesdays to Friday, 11AM to 8PM. </p>
      <p><b>Ruri South</b> is open for pickup and walk-in customers on Saturdays and Sundays from 8AM to 8PM.</p>
    </>
  },
]
const FAQ_2 = [
  {
    q: 'What payment methods do you accept?',
    a: <p>We accept various payment methods for your convenience. You can pay using Debit/Credit Card or GCash via Paymongo and Maya. We also accept payments through Grabpay, Maya, and Maya Credit. For installment options, we offer Billease. These flexible payment options ensure a smooth and hassle-free transaction process.</p>
  },
  {
    q: 'How does the e-wallet work?',
    a: <p>Our e-wallet feature allows you to top up your account with credits, which you can use for future purchases. The top-up amount will equal your wallet credits with no discounts applied. This provides a convenient way to manage your payments and make quick transactions.</p>
  },
  {
    q: 'Do you deliver?',
    a: <>Yes, we do. We offer chilled delivery via Ninja Chill, servicing all of Metro Manila for a flat rate of ₱150 per 20 kilos. Additionally, we deliver to surrounding towns and cities using door-to-door services like Lalamove, Grab, etc. For more information, please contact our customer support at info@ruriclub.com.</>
  },
  {
    q: 'Do you accept walk-ins?',
    a: <>Yes, we do. Walk-ins are welcome at Ruri Central and Ruri South on Saturdays and Sundays from 8 AM to 8 PM. Additionally, we offer Cyber Monday deals and Concierge Weekdays with deliveries arranged by clients.</>
  },
  {
    q: 'Do you accept COD payment?',
    a: <p>Unfortunately, not now. To ensure prompt and direct payment to our farmers, all orders must be paid upon placement via Maya, GCash, GrabPay, or bank transfer. This system helps us maintain a seamless and efficient operation, ensuring fair and immediate compensation for the farmers.</p>
  },
  {
    q: "Where's my order?",
    a: <p>Most of our produce has a tentative dispatch date. We encourage you to check our latest Viber announcements for updates on your order status. With our new delivery service feature, we strive to send your orders as soon as they become available.</p>
  },
  {
    q: 'What produce do you have?',
    a: <p>Our selection of produce changes regularly, depending on the needs of the distressed farmers we are supporting at the time. We prioritize helping those in urgent need, which means our offerings can vary from week to week. To stay informed about our current produce and rescue efforts, we encourage you to join our Facebook group. There, you'll receive real-time updates on available products, upcoming rescue operations, and how your purchases make a difference in the lives of local farmers.</p>
  },
]
const FAQ_3 = [
  {
    q: 'How do you ensure the quality of the produce?',
    a: <p>We work closely with local farmers to ensure that all produce is fresh and of the highest quality. Our team carefully inspects all items before dispatch to ensure they meet widely accepted quality standards.</p>
  },
  {
    q: 'How do you ensure food safety?',
    a: <p>We take food safety very seriously. All produce is sourced from trusted local farmers who follow strict agricultural practices. Our team conducts regular quality checks and ensures that all items are handled and stored properly. For chilled items, we use Ninja Chill delivery services to maintain optimal temperatures and ensure freshness upon arrival.</p>
  },
  {
    q: 'How can I contact customer support?',
    a: <p>To reach our customer support team, you can send us a direct message, or contact us via SMS, Viber, or phone call at 09175387787 (Andie) or 09177187787 (Ally). For order-related concerns, please provide your order number and full name to help us assist you more efficiently.</p>
  },
  {
    q: 'Can I change or cancel my order?',
    a: <p>Yes, you can change or cancel your order by contacting our customer support team. Please provide your order number and full name to assist us in processing your request efficiently. However, we encourage you to avoid cancellations if possible. We would be happy to suggest ways to redirect your contribution to other initiatives that help support rural communities, ensuring your support still makes a positive impact.</p>
  },
  {
    q: 'What is your return or refund policy?',
    a: <p>If you encounter any issues with your order, such as damaged or spoiled produce, please contact our customer support team within 24 hours of receiving your delivery. Provide your order number, full name, and details of the issue. We will work with you to resolve the problem, whether it involves a replacement or a refund. We also encourage that you accept store credits so we can redirect your help to another farmer.</p>
  },
  {
    q: 'How do you protect the privacy of your customers and their data?',
    a: <p>We take your privacy seriously. We use strong security measures to keep your personal information safe and private. Only authorized staff can access your data. We follow the Philippines Data Privacy Act (DPA) of 2012, which means we get your consent to collect data and give you the right to access, correct, or delete your information. Your privacy and data security are our top priorities.</p>
  },
  {
    q: 'What is the Rescue Buy campaign?',
    a: <p>The Rescue Buy campaign aims to help farmers who have an excess supply of produce. By purchasing through this campaign, you help prevent food waste and ensure farmers receive fair compensation for their crops.</p>
  },
  {
    q: 'How do I participate in the efforts?',
    a: <p>By joining Ruri Club, you are directly supporting thousands of farmers, providing them with a stable and alternative market. Additionally, during times of bumper crops, your purchases play a crucial role in the success of Rural Rising Philippines’ rescue missions. Every membership and order helps us sustain and uplift our farming communities.</p>
  },
  {
    q: 'How can I support the farmers further?',
    a: <p>Besides purchasing through Ruri Club and participating in the Rescue Buy campaign, you can also donate to our initiatives, volunteer for our programs, and spread the word about our mission to help us reach more people and support more farmers.</p>
  },
  {
    q: 'How can I help Ruri Club make a bigger impact?',
    a: <p>You can help Ruri Club make a bigger impact by becoming a member, encouraging friends and family to join, and actively participating in our campaigns and events. Your involvement helps us provide more support to rural communities, improve their livelihoods, and promote sustainable farming practices.</p>
  },
]

function FAQs() {
  const [showStates, setShowStates] = useState([])
  const [mountedStates, setMountedStates] = useState([])
  const timersRef = useRef({})

  document.title = 'RURI CLUB | FAQs'

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((t) => clearTimeout(t))
      timersRef.current = {}
    }
  }, [])

  const toggleIndex = (index) => {
    const isShown = showStates.includes(index)

    if (isShown) {
      setShowStates(prev => prev.filter(i => i !== index))

      if (timersRef.current[index]) {
        clearTimeout(timersRef.current[index])
      }

      timersRef.current[index] = setTimeout(() => {
        setMountedStates(prev => prev.filter(i => i !== index))
        delete timersRef.current[index]
      }, CLOSE_DELAY)
    } else {
      if (!mountedStates.includes(index)) {
        setMountedStates(prev => [...prev, index])
      }

      if (timersRef.current[index]) {
        clearTimeout(timersRef.current[index])
        delete timersRef.current[index]
      }

      setTimeout(() => {
        setShowStates(prev => (prev.includes(index) ? prev : [...prev, index]))
      }, 10)
    }
  }

  return (
    <section className={s.faq}>
      <h2>Frequently Asked Questions</h2>
      <div className="container">
        <div className={s.category}>
          <h3>About Ruri Club and Membership</h3>
          <ul>
            {FAQ_1.map((item, idx) => {
              const key = `ag-1-${idx}`
              const isOpen = showStates.includes(key)
              const isMounted = mountedStates.includes(key)
              return (
                <li key={key} className={cn(s.item, { [s.show]: isOpen })}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    className={s.header}
                    onClick={() => toggleIndex(key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleIndex(key)
                      }
                    }}
                  >
                    <h4>{item.q}</h4>
                    <div className='flex a-center'>
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/>
                      </svg>
                    </div>
                  </div>
                  {isMounted && (
                    <div className={s.content}>
                      {item.a}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={s.category}>
          <h3>Ordering and Delivery</h3>
          <ul>
            {FAQ_2.map((item, idx) => {
              const key = `ag-2-${idx}`
              const isOpen = showStates.includes(key)
              const isMounted = mountedStates.includes(key)
              return (
                <li key={key} className={cn(s.item, { [s.show]: isOpen })}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    className={s.header}
                    onClick={() => toggleIndex(key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleIndex(key)
                      }
                    }}
                  >
                    <h4>{item.q}</h4>
                    <div className='flex a-center'>
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/>
                      </svg>
                    </div>
                  </div>
                  {isMounted && (
                    <div className={s.content}>
                      {item.a}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={s.category}>
          <h3>Produce, Quality, and Support</h3>
          <ul>
            {FAQ_3.map((item, idx) => {
              const key = `ag-3-${idx}`
              const isOpen = showStates.includes(key)
              const isMounted = mountedStates.includes(key)
              return (
                <li key={key} className={cn(s.item, { [s.show]: isOpen })}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    className={s.header}
                    onClick={() => toggleIndex(key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleIndex(key)
                      }
                    }}
                  >
                    <h4>{item.q}</h4>
                    <div className='flex a-center'>
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/>
                      </svg>
                    </div>
                  </div>
                  {isMounted && (
                    <div className={s.content}>
                      {item.a}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FAQs