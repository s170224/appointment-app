import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', like: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date, appointmentList} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      ifFavorite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachContact => {
        if (id === eachContact.id) {
          return {...eachContact, ifFavorite: !eachContact.ifFavorite}
        }
        return eachContact
      }),
    }))
  }

  changeLike = () => {
    const {like} = this.state
    this.setState({like: !like})
  }

  starredItemsList = () => {
    const {appointmentList, like} = this.state
    if (like) {
      return appointmentList.filter(each => each.ifFavorite === true)
    }
    return appointmentList
  }

  render() {
    const {appointmentList, title} = this.state
    const starredFilterList = this.starredItemsList()
    return (
      <div className="bgContainer">
        <div className="formContainer">
          <div>
            <h1>Add Appointment</h1>
            <form className="formClass">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                onChange={this.onChangeTitle}
                value={title}
              />
              <label htmlFor="date">DATE</label>
              <input
                type="date"
                id="date"
                placeholder="dd/mm/yyyy"
                onChange={this.onChangeDate}
              />
              <div>
                <button
                  type="submit"
                  className="button"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>
        </div>
        <hr />
        <div>
          <h1>Appointments</h1>
          <button onClick={this.changeLike}>starred</button>
          <ul className="list-con">
            {starredFilterList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointment={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
