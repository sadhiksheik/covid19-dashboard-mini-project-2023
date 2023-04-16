/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import Graphs from '../Graphs'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const formattedData = statesList.map(each => ({
  stateCode: each.state_code,
  stateName: each.state_name,
}))

const fetchConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class StateSpecifiedRoute extends Component {
  state = {
    fetchResult: fetchConstants.initial,
    isConfirmed: true,
    isActive: false,
    isRecovered: false,
    isDeceased: false,
    districtsList: [],
    totalList: [],
    metaList: [],
    stateName: '',
    requiredDist: [],
    newCode: '',
    barChartValue: 'confirmed',
  }

  componentDidMount() {
    this.getSpecificStateData()
  }

  getDistrictsDataList = data => {
    const resultList = []
    const keyNames = Object.keys(data)
    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        resultList.push({
          keyName,
          confirmed,
          deceased,
          recovered,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  getTotalDataList = total => {
    const resultList = []
    const confirmed = total.confirmed ? total.confirmed : 0
    const deceased = total.deceased ? total.deceased : 0
    const recovered = total.recovered ? total.recovered : 0
    const tested = total.tested ? total.tested : 0
    resultList.push({
      confirmed,
      deceased,
      recovered,
      tested,
      active: confirmed - (deceased + recovered),
    })

    return resultList
  }

  getMetaDataList = meta => {
    const metaList = []
    metaList.push(meta)
    return metaList
  }

  getSpecificStateData = async () => {
    this.setState({fetchResult: fetchConstants.loading})

    const {match} = this.props
    const {params} = match
    const stateCode = params
    const code = stateCode.stateCode

    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')

    if (response.ok === true) {
      const fetchedData = await response.json()
      // console.log(fetchedData[code])
      const stateData = fetchedData[code]
      // console.log(stateData)
      const districtsData = this.getDistrictsDataList(stateData.districts)
      districtsData.sort((a, b) => b.confirmed - a.confirmed)
      // console.log(districtsData)
      const displayData = districtsData.map(each => ({
        keyName: each.keyName,
        value: each.confirmed,
      }))
      const stateTotal = this.getTotalDataList(stateData.total)
      // console.log(stateTotal)
      const stateMeta = this.getMetaDataList(stateData.meta)
      // console.log(stateMeta)

      const activeStateName = formattedData.filter(
        each => each.stateCode === code,
      )
      // console.log(activeStateName.stateName)

      this.setState({
        fetchResult: fetchConstants.success,
        districtsList: districtsData,
        totalList: stateTotal,
        metaList: stateMeta,
        stateName: activeStateName,
        requiredDist: displayData,
        newCode: code,
      })
    }
  }

  getLoaderView = () => (
    <div className="about-loader-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#0b69ff" height={40} width={40} />
    </div>
  )

  onConfirmedActive = () => {
    const {districtsList} = this.state
    const displayData = districtsList.map(each => ({
      keyName: each.keyName,
      value: each.confirmed,
    }))

    this.setState({
      requiredDist: displayData,
      isConfirmed: true,
      isActive: false,
      isRecovered: false,
      isDeceased: false,
      barChartValue: 'confirmed',
    })
  }

  onActiveClicked = () => {
    const {districtsList} = this.state

    const displayData = districtsList.map(each => ({
      keyName: each.keyName,
      value: each.active,
    }))
    displayData.sort((a, b) => b.value - a.value)
    this.setState({
      requiredDist: displayData,
      isConfirmed: false,
      isActive: true,
      isRecovered: false,
      isDeceased: false,
      barChartValue: 'active',
    })
  }

  onRecoveredClicked = () => {
    const {districtsList} = this.state
    const displayData = districtsList.map(each => ({
      keyName: each.keyName,
      value: each.recovered,
    }))
    displayData.sort((a, b) => b.value - a.value)
    this.setState({
      requiredDist: displayData,
      isConfirmed: false,
      isActive: false,
      isRecovered: true,
      isDeceased: false,
      barChartValue: 'recovered',
    })
  }

  onDeceasedClicked = () => {
    const {districtsList} = this.state
    const displayData = districtsList.map(each => ({
      keyName: each.keyName,
      value: each.deceased,
    }))
    displayData.sort((a, b) => b.value - a.value)
    this.setState({
      requiredDist: displayData,
      isConfirmed: false,
      isActive: false,
      isRecovered: false,
      isDeceased: true,
      barChartValue: 'deceased',
    })
  }

  getStateSuccessView = () => {
    const {
      districtsList,
      totalList,
      metaList,
      stateName,
      isConfirmed,
      isActive,
      isRecovered,
      isDeceased,
      requiredDist,
      newCode,
      barChartValue,
    } = this.state
    console.log(districtsList)
    // console.log(newCode)
    const name = stateName[0].stateName
    const testedCount = totalList[0].tested

    const updatedDate = metaList[0].last_updated
    const fullDate = new Date(updatedDate)

    const confirmedClass = isConfirmed ? 'active-confirmed' : null
    const activeClass = isActive ? 'active-active' : null
    const recoveredClass = isRecovered ? 'recovered-active' : null
    const deceasedClass = isDeceased ? 'deceased-active' : null

    return (
      <>
        <div className="name-tested-container">
          <div className="date-name-cont">
            <div className="name-box">
              <h1 className="state-name">{name}</h1>
            </div>
            <p className="date">Last updated on {fullDate.toString()}</p>
          </div>
          <div className="tested-count-container">
            <p className="tested-text">Tested</p>
            <p className="tested-count">{testedCount}</p>
          </div>
        </div>
        <div className="state-cards-cont">
          <button
            type="button"
            className="cont-but"
            onClick={this.onConfirmedActive}
          >
            <div
              className={`state-confirmed-card state-confirmed-color ${confirmedClass}`}
              testid="stateSpecificConfirmedCasesContainer"
            >
              <p className="home-confirmed">Confirmed</p>
              <img
                className="state-image"
                alt="state specific confirmed cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679996912/check-mark_1_zjb32i.svg"
              />
              <p className="state-count">{totalList[0].confirmed}</p>
            </div>
          </button>
          <button
            type="button"
            className="cont-but"
            onClick={this.onActiveClicked}
          >
            <div
              className={`state-active-card state-confirmed-card ${activeClass} `}
              testid="stateSpecificActiveCasesContainer"
            >
              <p className="home-confirmed">Active</p>
              <img
                className="state-image"
                alt="state specific active cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997218/protection_2_t1dqu1.png"
              />
              <p className="state-count">{totalList[0].active}</p>
            </div>
          </button>
          <button
            type="button"
            className="cont-but"
            onClick={this.onRecoveredClicked}
          >
            <div
              className={`state-recovered-card state-confirmed-card ${recoveredClass}`}
              testid="stateSpecificRecoveredCasesContainer"
            >
              <p className="home-confirmed">Recovered</p>
              <img
                className="state-image"
                alt="state specific recovered cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997447/recovered_1_lvrlkt.svg"
              />
              <p className="state-count">{totalList[0].recovered}</p>
            </div>
          </button>
          <button
            type="button"
            className="cont-but"
            onClick={this.onDeceasedClicked}
          >
            <div
              className={`state-deceased-card state-confirmed-card ${deceasedClass} `}
              testid="stateSpecificDeceasedCasesContainer"
            >
              <p className="home-confirmed">Deceased</p>
              <img
                className="state-image"
                alt="state specific deceased cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997518/breathing_1_uhqfex.svg"
              />
              <p className="state-count">{totalList[0].deceased}</p>
            </div>
          </button>
        </div>

        <div className="state-cards-mobile-cont">
          <button
            type="button"
            className="cont-but"
            onClick={this.onConfirmedActive}
          >
            <div
              className={`state-confirmed-card state-confirmed-color ${confirmedClass}`}
              testid="stateSpecificConfirmedCasesContainer"
            >
              <p className="home-confirmed">Confirmed</p>
              <img
                className="state-image"
                alt="state specific confirmed cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679996912/check-mark_1_zjb32i.svg"
              />
              <p className="state-count">{totalList[0].confirmed}</p>
            </div>
          </button>
          <button
            type="button"
            className="cont-but"
            onClick={this.onActiveClicked}
          >
            <div
              className={`state-active-card state-confirmed-card ${activeClass} `}
              testid="stateSpecificActiveCasesContainer"
            >
              <p className="home-confirmed">Active</p>
              <img
                className="state-image"
                alt="state specific active cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997218/protection_2_t1dqu1.png"
              />
              <p className="state-count">{totalList[0].active}</p>
            </div>
          </button>
        </div>
        <div className="state-cards-mobile-cont">
          <button
            type="button"
            className="cont-but"
            onClick={this.onRecoveredClicked}
          >
            <div
              className={`state-recovered-card state-confirmed-card ${recoveredClass}`}
              testid="stateSpecificRecoveredCasesContainer"
            >
              <p className="home-confirmed">Recovered</p>
              <img
                className="state-image"
                alt="state specific recovered cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997447/recovered_1_lvrlkt.svg"
              />
              <p className="state-count">{totalList[0].recovered}</p>
            </div>
          </button>
          <button
            type="button"
            className="cont-but"
            onClick={this.onDeceasedClicked}
          >
            <div
              className={`state-deceased-card state-confirmed-card ${deceasedClass} `}
              testid="stateSpecificDeceasedCasesContainer"
            >
              <p className="home-confirmed">Deceased</p>
              <img
                className="state-image"
                alt="state specific deceased cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997518/breathing_1_uhqfex.svg"
              />
              <p className="state-count">{totalList[0].deceased}</p>
            </div>
          </button>
        </div>

        <h1 className="top-dist-heading">Top Districts</h1>
        <ul testid="topDistrictsUnorderedList" className="top-dist-ul">
          {requiredDist.map(each => (
            <li key={each.keyName} className="dist-li">
              <p className="value">{each.value}</p>
              <p className="dist-name">{each.keyName}</p>
            </li>
          ))}
        </ul>
        <Graphs activeCode={newCode} value={barChartValue} />
      </>
    )
  }

  getSwitchResults = () => {
    const {fetchResult} = this.state
    switch (fetchResult) {
      case fetchConstants.loading:
        return this.getLoaderView()
      case fetchConstants.success:
        return this.getStateSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="entire-specific-container">
        <Header />
        <div className="specific-container">{this.getSwitchResults()}</div>
        <Footer />
      </div>
    )
  }
}
export default StateSpecifiedRoute
