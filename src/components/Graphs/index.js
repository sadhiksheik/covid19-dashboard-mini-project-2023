/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Line,
} from 'recharts'
import './index.css'

const graphConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class Graphs extends Component {
  state = {graphResults: graphConstants.initial, graphsDataList: []}

  componentDidMount() {
    this.getGraphsData()
  }

  getGraphsDataList = (data, activeCode) => {
    const resultList = []
    const newData = data[activeCode].dates
    const keyNames = Object.keys(newData)
    // console.log(keyNames)

    keyNames.forEach(keyName => {
      if (newData[keyName]) {
        const {total} = newData[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        resultList.push({
          keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })

    return resultList
  }

  getGraphsData = async () => {
    this.setState({graphResults: graphConstants.loading})
    const {activeCode} = this.props

    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${activeCode}`,
    )

    if (response.ok === true) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const formattedData = this.getGraphsDataList(fetchedData, activeCode)
      // console.log(formattedData)
      const arrLength = formattedData.length
      const finalData = formattedData.slice(arrLength - 10, arrLength)
      // console.log(finalData)
      this.setState({
        graphResults: graphConstants.success,
        graphsDataList: finalData,
      })
    }
  }

  renderGraphsLoader = () => (
    <div className="about-loader-container" testid="timelinesDataLoader">
      <Loader type="TailSpin" color="#0b69ff" height={40} width={40} />
    </div>
  )

  getFillColor = () => {
    const {value} = this.props
    switch (value) {
      case 'confirmed':
        return '#9A0E31'
      case 'active':
        return '#007BFF'
      case 'recovered':
        return '#28A745'
      case 'deceased':
        return '#6C757D'
      default:
        return null
    }
  }

  renderGraphsSuccessView = () => {
    const {graphsDataList} = this.state
    console.log(graphsDataList)
    const {value} = this.props
    const fillColor = this.getFillColor()

    return (
      <>
        <BarChart
          width={1032}
          height={431}
          className="bar-chart"
          data={graphsDataList}
        >
          <XAxis
            dataKey="keyName"
            tick={{
              stroke: fillColor,
              strokeWidth: 0.2,
              fontSize: 12,
              fontFamily: 'Roboto',
            }}
          />
          <YAxis
            tick={{
              stroke: fillColor,
              strokeWidth: 0.2,
              fontSize: 12,
              fontFamily: 'Roboto',
            }}
          />

          <Legend />
          <Bar
            dataKey={`${value}`}
            fill={`${fillColor}`}
            label={{position: 'top', color: 'white'}}
            radius={[10, 10, 0, 0]}
            barSize="10%"
          />
        </BarChart>
        <h1 className="line-charts-heading">Daily Spread Trends</h1>
        <div className="line-charts-cont" testid="lineChartsContainer ">
          <div className="line-chart-confirmed">
            <LineChart
              width={1146}
              height={328}
              data={graphsDataList}
              margin={{top: 30, right: 30, left: 20, bottom: 5}}
            >
              <XAxis dataKey="keyName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="confirmed"
                stroke="#FF073A"
              />
            </LineChart>
          </div>
          <div className="line-chart-active">
            <LineChart
              width={1146}
              height={328}
              data={graphsDataList}
              margin={{top: 30, right: 30, left: 20, bottom: 5}}
            >
              <XAxis dataKey="keyName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="active"
                stroke="#007BFF"
              />
            </LineChart>
          </div>
          <div className="line-chart-recovered">
            <LineChart
              width={1146}
              height={328}
              data={graphsDataList}
              margin={{top: 30, right: 30, left: 20, bottom: 5}}
            >
              <XAxis dataKey="keyName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="recovered"
                stroke="#27A243"
              />
            </LineChart>
          </div>
          <div className="line-chart-deceased">
            <LineChart
              width={1146}
              height={328}
              data={graphsDataList}
              margin={{top: 30, right: 30, left: 20, bottom: 5}}
            >
              <XAxis dataKey="keyName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="deceased"
                stroke="#6C757D"
              />
            </LineChart>
          </div>
          <div className="line-chart-tested">
            <LineChart
              width={1146}
              height={328}
              data={graphsDataList}
              margin={{top: 30, right: 30, left: 20, bottom: 5}}
            >
              <XAxis dataKey="keyName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="tested"
                stroke="#9673B9"
              />
            </LineChart>
          </div>
        </div>
      </>
    )
  }

  getSwitchedResults = () => {
    const {graphResults} = this.state
    switch (graphResults) {
      case graphConstants.loading:
        return this.renderGraphsLoader()
      case graphConstants.success:
        return this.renderGraphsSuccessView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.getSwitchedResults()}</div>
  }
}
export default Graphs
