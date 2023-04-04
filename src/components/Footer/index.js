import {FiInstagram, FiGithub} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="website-logo-footer">
      COVID19<span className="logo-span-footer">INDIA</span>
    </h1>
    <p className="footer-para">
      we stand with everyone fighting on the front lines
    </p>
    <div className="media-container">
      <FiGithub className="media-icons" />
      <FiInstagram className="media-icons" />
      <FaTwitter className="media-icons" />
    </div>
  </div>
)
export default Footer
