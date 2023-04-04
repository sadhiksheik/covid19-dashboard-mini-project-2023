import {withRouter} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onHomeButtonClicked = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="entire-not-container">
      <img
        className="not-found-image"
        alt="not-found-pic"
        src="https://res.cloudinary.com/dyal335uz/image/upload/v1679823023/Group_7484_rjfspt.svg"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>
      <button
        type="button"
        className="not-found-button"
        onClick={onHomeButtonClicked}
      >
        Home
      </button>
    </div>
  )
}
export default withRouter(NotFound)
