/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiAboutConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class About extends Component {
  state = {apiResult: apiAboutConstants.initial, aboutList: []}

  componentDidMount() {
    this.getAboutDetails()
  }

  getAboutDetails = async () => {
    this.setState({apiResult: apiAboutConstants.loading})
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const data = await response.json()
    // console.log(data)
    const formattedData = data.faq
    this.setState({
      aboutList: formattedData,
      apiResult: apiAboutConstants.success,
    })
    // console.log(formattedData)
  }

  renderSuccessView = () => {
    const {aboutList} = this.state

    return (
      // testid="faqsUnorderedList"
      <>
        <h1 className="about-para">About</h1>
        <p className="about-update-para">Last update on march 28th 2021.</p>
        <p className="about-ready-para">
          COVID-19 vaccines be ready for distribution
        </p>

        <ul className="about-ul-container" testid="faqsUnorderedList">
          {aboutList.map(eachFaq => (
            <li key={eachFaq.qno} className="faqs-li">
              <p className="question">{eachFaq.question}</p>
              <p className="answer">{eachFaq.answer}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    // data-testid="aboutRouteLoader"
    <div className="about-loader-container" testid="aboutRouteLoader">
      <Loader type="TailSpin" color="#0b69ff" height={80} width={80} />
    </div>
  )

  getSwitchResults = () => {
    const {apiResult} = this.state
    switch (apiResult) {
      case apiAboutConstants.success:
        return this.renderSuccessView()
      case apiAboutConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="entire-about-container">
        <Header />
        <div className="about-container">{this.getSwitchResults()}</div>
        <Footer />
      </div>
    )
  }
}
export default About
