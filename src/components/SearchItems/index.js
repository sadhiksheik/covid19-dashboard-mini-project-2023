import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchItems = props => {
  const {details} = props
  const {stateCode, stateName} = details

  return (
    <Link to={`/state/${stateCode}`} className="search-item-links">
      <li className="state-item-container">
        <p className="state-name-search">{stateName}</p>
        <div className="code-icon-container">
          <p className="state-code">{stateCode}</p>
          <BiChevronRightSquare className="right-icon" />
        </div>
      </li>
    </Link>
  )
}
export default SearchItems
