
import { assets } from "../../assets/assets";
import "./Footer.css";
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">

            <img src={assets.logo} />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro esse dolores blanditiis numquam impedit saepe et consequuntur, dolorem praesentium. Aut accusantium, totam quam quod veniam voluptas vitae soluta id optio!</p>
             <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
             </div>
            </div> 

          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
          </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-234-980-9090</li>
                <li>contact@zaykawala.com</li>
            </ul>
        </div> 
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright © 2026 Zaykawala. All Rights Reserved. Designed by Krishna
      </p>
    </div>
  )
}

export default Footer
