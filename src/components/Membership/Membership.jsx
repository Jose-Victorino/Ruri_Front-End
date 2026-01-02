import React from 'react'
import { useGlobal, ACTIONS } from '@/context/GlobalContext'

import s from './Membership.module.scss'
import Tier from './Tier'

function Membership() {
  const { state, dispatch } = useGlobal()
  const { MEMBERSHIPS } = state
  document.title = "RURI CLUB | Membership"

  return (
    <>
      <section className={s.hero}>
        <div>
          <h2>Continuing our mission.</h2>
          <p>Over the past four years, Rural Rising Philippines has worked tirelessly to connect growers and consumers. In 2021, we had 500 Founder Members sign up, a testament to the overwhelming support and trust our community had in our mission. In late 2023, we soft-launched the Ruri Club in order to encourage and support organic farmers in Kabayan, Benguet.  The initial launch was promising and showed us what we needed to do to make the program more structured and impactful. The first half of 2024 we dedicated to testing the walk-in retail market and streamlining our digital marketplace. To all the early adopters who continue to believe in RuRi through all the years, we are incredibly grateful.</p>
        </div>
      </section>
      <section className={s.testaments}>
        <div className='container'>
          <ul className={s.testamentList}>
            <li>
              <h2>Reaffirming Our commitment</h2>
              <p>With the struggles of our farmers remaining dire and ever increasingly evident, there is no going back for RuRi; we would like to go bravely forward. Armed with four years of experience, we are now ready to engage with all stakeholders effectively.</p>
            </li>
            <li>
              <h2>Path to Sustainability</h2>
              <p>With the RuRi Club Membership, we shall invest in essential IT and customer service infrastructure in the city that would support a sustainable community-supported agriculture program in the countryside. By joining Ruri Club, you become part of a transformative movement that values sustainability, community, and high-quality food.</p>
            </li>
            <li>
              <h2>Engaging with the community</h2>
              <p>At Ruri Club , we believe in fostering a strong community connection. Members are invited to participate in educational workshops on canning, storing, and cooking fresh produce, as well as social events.</p>
            </li>
            <li>
              <h2>Supporting farmers and our vision</h2>
              <p>Your Ruri Club membership directly supports local farmers through various projects designed to improve agricultural practices, increase productivity, and ensure sustainability, among them: rapid composting sites, tramlines, aggregate centers, ater infrastructure, training and education, and market access.</p>
            </li>
          </ul>
        </div>
      </section>
      <section className={s.memberships}>
        <div className='container flex-col a-center'>
          <h2>Membership Tiers</h2>
          <p className={s.description}>Your support is more than a contribution, it's a major step towards our vision of empowering 100,000 sustainable and debt-free farmers by 2030. Our Rural Rising community hand-in-hand with farmer communities, it is possible to create a resilient and self-sufficient agricultural system that thrives independently, ensuring a prosperous and healthy future for all.</p>
          <ul>{MEMBERSHIPS.map((m) => <Tier key={m.membershipId} {...m}/>)}</ul>
        </div>
      </section>
      <section className={s.benefits}>
        <div className='container'>
          <h2 className='mb-20'>Additional Benefits of Ruri Club</h2>
          <ul className={s.benefitList}>
            <li>
              <div className='flex'>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.0622 8.5L5.9378 15.5M18.0622 8.5L19.1602 4.40192M18.0622 8.5L22.1602 9.59808M5.9378 15.5L1.83972 14.4019M5.9378 15.5L4.83972 19.5981M18.0621 15.4999L5.93771 8.49986M18.0621 15.4999L22.1602 14.4018M18.0621 15.4999L19.1602 19.598M5.93771 8.49986L4.83986 4.40203M5.93771 8.49986L1.83986 9.59819M12 5L12 19M12 5L8.99998 2M12 5L15 2M12 19L8.99998 22M12 19L15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Chilled Delivery</h3>
                <p>We have partnered with Ninja Chill for a new delivery service that uses mobile cold chain technology. Your produce will arrive at your doorstep in optimum condition, freshness and quality maintained.</p>
              </div>
            </li>
            <li>
              <div className='flex'>
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 119.43 122.88">
                  <path d="M118.45,51l1,1-.74,9.11H99A40.52,40.52,0,0,1,81.88,78.43q-11.44,6.28-27.71,7h-15l.5,37.43H21.42l.74-36.94-.24-24.87H1L0,59.84.74,51H21.92l-.25-15.26H1l-1-1,.74-9.11H21.67L21.42.25,63.29,0Q78.8,0,88.65,6.53T102,25.61h16.5l1,1.23-.74,8.87h-15v3.94A53.17,53.17,0,0,1,102.44,51ZM39.65,25.61H81.26Q74.85,14,58.61,13.3L39.89,14l-.24,11.57ZM39.4,51H83.23a39.51,39.51,0,0,0,1.23-9.6,46.17,46.17,0,0,0-.24-5.66H39.65L39.4,51ZM58.61,71.91q12.56-2.72,19.21-10.84H39.4l-.25,10.1,19.46.74Z"/>
                </svg>
              </div>
              <div>
                <h3>Affiliate Discounts and Rewards</h3>
                <p>Enjoy RuRi exclusive discounts and rewards from affiliate partners. We invited business owners within the Rural Rising Philippines community to participate in giving members additional benefits and their brands added visibility. We believe that these collaborations will also further strengthen the community.</p>
              </div>
            </li>
            <li>
              <div className='flex'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Concierge Shopping</h3>
                <p>Soon we shall introduce a concierge shopping service that will ease ordering and delivery.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Membership