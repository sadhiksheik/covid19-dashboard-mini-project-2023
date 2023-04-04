import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdCancel} from 'react-icons/md'
import './index.css'

class Header extends Component {
  state = {
    isShow: false,
    isHomeActive: true,
    isAboutActive: false,
    isVaccinationActive: false,
  }

  onClickHamburger = () => {
    this.setState({isShow: true})
  }

  onClickCross = () => {
    this.setState({isShow: false})
  }

  onHomeActive = () => {
    this.setState({
      isHomeActive: true,
      isAboutActive: false,
      isVaccinationActive: false,
    })
  }

  onAboutActive = () => {
    this.setState({
      isHomeActive: false,
      isAboutActive: true,
      isVaccinationActive: false,
    })
  }

  onVaccinationActive = () => {
    this.setState({
      isHomeActive: false,
      isVaccinationActive: true,
      isAboutActive: false,
    })
  }

  render() {
    const {
      isShow,
      isHomeActive,
      isAboutActive,
      isVaccinationActive,
    } = this.state
    const homeClass = isHomeActive ? 'active-class' : null
    const aboutClass = isAboutActive ? 'active-class' : null
    const vaccineClass = isVaccinationActive ? 'active-class' : null

    return (
      <>
        <div className="nav-container">
          <Link to="/" className="link-icon">
            <h1 className="website-logo">
              COVID19<span className="logo-span">INDIA</span>
            </h1>
          </Link>

          <ul className="desktop-container">
            <li className="header-li-el" onClick={this.onHomeActive}>
              <Link to="/" className={`link-element ${homeClass}`}>
                Home
              </Link>
            </li>
            <li className="header-li-el" onClick={this.onAboutActive}>
              <Link to="/about" className={`link-element ${aboutClass}`}>
                About
              </Link>
            </li>
            <li className="header-li-el" onClick={this.onVaccinationActive}>
              <Link
                to="/vaccination"
                className={`link-element ${vaccineClass}`}
              >
                Vaccination
              </Link>
            </li>
          </ul>

          <img
            alt="hamburger"
            onClick={this.onClickHamburger}
            className="hamburger"
            src="https://res.cloudinary.com/dyal335uz/image/upload/v1679764990/add-to-queue_1_ewsuw0.svg"
          />
        </div>
        {isShow ? (
          <div className="mobile-nav-drop-down">
            <ul className="mobile-container">
              <li className="header-li-el" onClick={this.onHomeActive}>
                <Link to="/" className={homeClass}>
                  Home
                </Link>
              </li>
              <li className="header-li-el" onClick={this.onAboutActive}>
                <Link to="/about" className={aboutClass}>
                  About
                </Link>
              </li>
              <li className="header-li-el" onClick={this.onVaccinationActive}>
                <Link to="/vaccination" className={vaccineClass}>
                  Vaccination
                </Link>
              </li>
            </ul>
            <button
              onClick={this.onClickCross}
              type="button"
              className="cross-button"
            >
              <MdCancel className="cross-icon" />
            </button>
          </div>
        ) : null}
      </>
    )
  }
}

export default Header
