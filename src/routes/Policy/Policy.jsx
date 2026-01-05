import React from 'react'

import s from './Policy.module.scss'

function Policy() {
  document.title = "RURI CLUB | Policies"

  return (
    <div className={s.policy}>
      <section className='pad-block-30'>
        <div className="container">
          <h3>Spoilage Policy</h3>
          <p>You must claim your produce within one day of the dispatch date. We are unable to store your produce for long but we shall not allow it to spoil. What a tragedy to save the produce from one place only to allow it to spoil in another, right? We shall donate it in your name to the community pantries and to our feeding program in Tondo. Please understand that we shall neither entertain requests to replace your produce at a later date nor substitute it for another produce. For failure to claim your produce, your payment is essentially forfeited.</p>
        </div>
      </section>
      <section className='pad-block-30'>
        <div className="container">
          <h3>Allergy Disclaimer</h3>
          <p>The produce will be delivered to you in the condition we receive them from our farmers. Occasionally we replace the packaging or bundling, but that is it. Members concerned with food allergies need to be aware of this risk of handling or consuming certain kinds of produce. There is always the possibility that raw produce may have substances that could trigger certain types of allergies, thus extreme caution is advised. Rural Rising Ph will not assume any liability for adverse reactions to raw produce handled or produce consumed.</p>
        </div>
      </section>
      <section className='pad-block-30'>
        <div className="container">
          <h3>Privacy Policy</h3>
          <p>When you sign up to avail of this offer, you give us certain information voluntarily. This includes your name, email address, phone number, etc. If you buy something from Rural Rising Ph, we collect payment information, contact information and details of what you bought. If you link your Facebook account, we also get information from those accounts (such as your friends and contacts). The information we get from those services depends on your settings and their privacy policies, so please check what those are. We only collect the information you choose to give us, and we process it with your consent, to fulfill the purpose of your interaction with us. We don’t sell it to other parties.</p>
        </div>
      </section>
      <section className='pad-block-30'>
        <div className="container">
          <h3>Weight Notice</h3>
          <p>The weight of the produce as indicated above is an approximate value. Due to variances in individual size and weight, the sheer volume of produce we handle, and conditions and handling while in transit to you, we cannot guarantee exact weight. Expect small discrepancies but be ready to be surprised if you get more than you ordered. If you get less, please know that it was not our intention give you less.</p>
        </div>
      </section>
      <section className='pad-block-30'>
        <div className="container">
          <h3>Refund and Return Policy</h3>
          <div className='flex-col gap-20'>
            <div>
              <h4>Q: How can I contact customer support?</h4>
              <p>A: To reach our customer support team, you can send us a direct message, or contact us via SMS, Viber, or phone call at 09175387787 (Andie) or 09177187787 (Ally). For order-related concerns, please provide your order number and full name to help us assist you more efficiently.</p>
            </div>
            <div>
              <h4>Q: Can I change or cancel my order?</h4>
              <p>A: Yes, you can change or cancel your order by contacting our customer support team. Please provide your order number and full name to assist us in processing your request efficiently. However, we encourage you to avoid cancellations if possible. We would be happy to suggest ways to redirect your contribution to other initiatives that help support rural communities, ensuring your support still makes a positive impact.</p>
            </div>
            <div>
              <h4>Q: What is your return or refund policy?</h4>
              <p>A: If you encounter any issues with your order, such as damaged or spoiled produce, please contact our customer support team within 24 hours of receiving your delivery. Provide your order number, full name, and details of the issue. We will work with you to resolve the problem, whether it involves a replacement or a refund. We also encourage that you accept store credits so we can redirect your help to another farmer.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Policy