import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointment, toggleIsFavorite} = props
  const {id, title, date, ifFavorite} = appointment

  const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const likeImage = ifFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onFavorite = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="li-con">
      <div className="bg-con">
        <div className="fav-con">
          <h1>{title}</h1>
          <button onClick={onFavorite} data-testid="star">
            <img src={likeImage} alt="star" />
          </button>
        </div>
        <p>{newDate}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
