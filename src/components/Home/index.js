/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FcGenericSortingDesc, FcGenericSortingAsc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import SearchItems from '../SearchItems'
import Header from '../Header'
import Footer from '../Footer'

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

const homeResultConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

const formattedData = statesList.map(each => ({
  stateCode: each.state_code,
  stateName: each.state_name,
}))
// console.log(formattedData)

class Home extends Component {
  state = {
    searchInput: '',
    searchList: formattedData,
    stateResult: homeResultConstants.initial,
    statesData: [],
  }

  componentDidMount() {
    this.getNationalData()
  }

  convertObjectsDataIntoListItems = fetchedData => {
    const resultList = []

    const keyNames = Object.keys(fetchedData)

    keyNames.forEach(keyName => {
      // console.log(keyName)
      if (fetchedData[keyName]) {
        const {total} = fetchedData[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = fetchedData[keyName].meta.population
          ? fetchedData[keyName].meta.population
          : 0
        const reqState = statesList.find(state => state.state_code === keyName)
        const name = reqState ? reqState.state_name : ''
        // console.log(name)
        resultList.push({
          stateCode: keyName,
          name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    // console.log(resultList)
    return resultList
  }

  getNationalData = async () => {
    this.setState({stateResult: homeResultConstants.loading})
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')

    if (response.ok === true) {
      //   console.log(response)
      const fetchedData = await response.json()
      console.log(fetchedData)

      const listFormattedData = this.convertObjectsDataIntoListItems(
        fetchedData,
      )
      // console.log(listFormattedData)
      this.setState({
        stateResult: homeResultConstants.success,
        statesData: listFormattedData,
      })
    }
  }

  onInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchItems = () => {
    const {searchInput, searchList} = this.state
    const filteredList = searchList.filter(each =>
      each.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredList.map(eachItem => (
      <SearchItems key={eachItem.stateCode} details={eachItem} />
    ))
  }

  getHomeLoaderView = () => (
    <div className="about-loader-container" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#0b69ff" height={40} width={40} />
    </div>
  )

  onAscendingOrder = () => {
    const {statesData} = this.state
    const sortedList = statesData.sort((a, b) =>
      b.stateCode.localeCompare(a.stateCode),
    )
    this.setState({statesData: sortedList})
  }

  onDescendingOrder = () => {
    const {statesData} = this.state
    console.log(statesData)
    const sortedList = statesData.sort((a, b) =>
      a.stateCode.localeCompare(b.stateCode),
    )
    this.setState({statesData: sortedList})
  }

  getCountryWideData = factor => {
    const finalConfirmed = factor.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    )
    return finalConfirmed
  }

  getHomeSuccessView = () => {
    const {searchInput, statesData} = this.state
    const filteredStatesData = statesData.filter(
      each => each.stateCode !== 'TT',
    )

    const confirmedArray = statesData.map(eachState => eachState.confirmed)
    const confirmed = this.getCountryWideData(confirmedArray)
    const activeArray = statesData.map(eachState => eachState.active)
    const active = this.getCountryWideData(activeArray)
    const recoverArray = statesData.map(eachState => eachState.recovered)
    const recovered = this.getCountryWideData(recoverArray)
    const deceasedArray = statesData.map(eachState => eachState.deceased)
    const deceased = this.getCountryWideData(deceasedArray)
    console.log(active)

    return (
      <>
        <div className="search-bar-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            value={searchInput}
            className="search-input"
            placeholder="Enter the State"
            onChange={this.onInputChange}
          />
        </div>
        <ul
          testid="searchResultsUnorderedList"
          className="searched-ul-container"
        >
          {searchInput !== '' ? this.getSearchItems() : null}
        </ul>
        <div className="home-cards-container">
          <div
            className="home-confirmed-card"
            testid="countryWideConfirmedCases"
          >
            <p className="home-confirmed">Confirmed</p>
            <img
              className="confirmed-image"
              alt="country wide confirmed cases pic"
              src="https://res.cloudinary.com/dyal335uz/image/upload/v1679996912/check-mark_1_zjb32i.svg"
            />
            <p className="home-count">{confirmed}</p>
          </div>
          <div className="home-active-card" testid="countryWideActiveCases">
            <p className="home-confirmed">Active</p>
            <img
              className="confirmed-image"
              alt="country wide active cases pic"
              src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997218/protection_2_t1dqu1.png"
            />
            <p className="home-count">{active}</p>
          </div>
          <div
            className="home-recovered-card"
            testid="countryWideRecoveredCases"
          >
            <p className="home-confirmed">Recovered</p>
            <img
              className="confirmed-image"
              alt="country wide recovered cases pic"
              src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997447/recovered_1_lvrlkt.svg"
            />
            <p className="home-count">{recovered}</p>
          </div>
          <div className="home-deceased-card" testid="countryWideDeceasedCases">
            <p className="home-confirmed">Deceased</p>
            <img
              className="confirmed-image"
              alt="country wide deceased  cases pic"
              src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997518/breathing_1_uhqfex.svg"
            />
            <p className="home-count">{deceased}</p>
          </div>
        </div>

        <div className="home-cards-mobile-container">
          <div className="mobile-sub-container">
            <div
              className="home-confirmed-card"
              testid="countryWideConfirmedCases"
            >
              <p className="home-confirmed">Confirmed</p>
              <img
                className="confirmed-image"
                alt="country wide confirmed cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679996912/check-mark_1_zjb32i.svg"
              />
              <p className="home-count">34285612</p>
            </div>
            <div className="home-active-card" testid="countryWideActiveCases">
              <p className="home-confirmed">Active</p>
              <img
                className="confirmed-image"
                alt="country wide active cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997218/protection_2_t1dqu1.png"
              />
              <p className="home-count">165803</p>
            </div>
          </div>
          <div className="mobile-sub-container">
            <div
              className="home-recovered-card"
              testid="countryWideRecoveredCases"
            >
              <p className="home-confirmed">Recovered</p>
              <img
                className="confirmed-image"
                alt="country wide recovered cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997447/recovered_1_lvrlkt.svg"
              />
              <p className="home-count">33661339</p>
            </div>
            <div
              className="home-deceased-card"
              testid="countryWideDeceasedCases"
            >
              <p className="home-confirmed">Deceased</p>
              <img
                className="confirmed-image"
                alt="country wide deceased  cases pic"
                src="https://res.cloudinary.com/dyal335uz/image/upload/v1679997518/breathing_1_uhqfex.svg"
              />
              <p className="home-count">458470</p>
            </div>
          </div>
        </div>

        <div testid="stateWiseCovidDataTable">
          <ul className="state-data-table-ul">
            <li className="column-names-li">
              <div className="name-column-box">
                <p className="column-names">States/UT</p>
                <button
                  onClick={this.onAscendingOrder}
                  className="sort-button"
                  type="button"
                  testid="ascendingSort"
                >
                  <FcGenericSortingAsc className="asc-icon" />
                </button>
                <button
                  onClick={this.onDescendingOrder}
                  className="sort-button"
                  type="button"
                  testid="descendingSort"
                >
                  <FcGenericSortingDesc className="asc-icon" />
                </button>
              </div>
              <p className="column-names">Confirmed</p>
              <p className="column-names">Active</p>
              <p className="column-names">Recovered</p>
              <p className="column-names">Deceased</p>
              <p className="column-names">population</p>
            </li>
            <hr className="line" />
            {filteredStatesData.map(each => (
              <Link to={`/state/${each.stateCode}`} className="home-link">
                <li key={each.stateCode} className="column-item-names-li">
                  <p className="item-name">{each.name}</p>
                  <p className="confirmed-item">{each.confirmed}</p>
                  <p className="active-item">{each.active}</p>
                  <p className="recovered-item">{each.recovered}</p>
                  <p className="deceased-item">{each.deceased}</p>
                  <p className="population-item">{each.population}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    )
  }

  getSwitchedHomeResults = () => {
    const {stateResult} = this.state

    switch (stateResult) {
      case homeResultConstants.loading:
        return this.getHomeLoaderView()
      case homeResultConstants.success:
        return this.getHomeSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="entire-home-container">
        <Header />
        <div className="home-container">{this.getSwitchedHomeResults()}</div>
        <Footer />
      </div>
    )
  }
}
export default Home
