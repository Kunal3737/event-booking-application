import React, { Component } from "react";
import Modal from "react-modal";
import styles from "../EventBooking/EventBooking.module.css";
import { connect } from "react-redux";
import eventBookingAction from "../../actions/eventBookingAction";

const initialState = {
  name: "",
  email: "",
  phoneNo: "",
  noOfSeats: "",
  nameOfAttendee: "",
  nameError: "",
  emailError: "",
  phoneNoError: "",
  noOfSeatsError: "",
  nameOfAttendeeError: "",
  ticketsBooked: "",
  isModal: false,
};

Modal.setAppElement("#root");
class EventBooking extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    this.props.eventBookingAction(this.props.match.params.eventId);
  }

  validateForm = () => {
    let nameError = "";
    let emailError = "";
    let noOfSeatsError = "";
    let nameOfAttendeeError = "";

    if (!this.state.name) {
      nameError = "*Please enter your name";
    }

    if (this.state.name.match(/(\d+)/)) {
      nameError = "*Only letters and spaces are allowed";
    }

    if (!this.state.email.includes("@")) {
      emailError = "*Invalid Email";
      if (!this.state.email) {
        emailError = "*Please enter your email";
      }
    }

    if (!this.state.noOfSeats) {
      noOfSeatsError = "*Please enter the number of seats";
    }
    const no_of_seats_available = parseInt(
      this.props.eventbookingData.event_details.no_of_seats_available
    );
    if (this.state.noOfSeats > no_of_seats_available) {
      noOfSeatsError = "*Number of seats selected is more than available seats";
    }

    if (!this.state.nameOfAttendee) {
      nameOfAttendeeError = "*Please enter the name of Attendee #2";
    }

    if (nameError || emailError || noOfSeatsError || nameOfAttendeeError) {
      this.setState({
        nameError,
        emailError,
        noOfSeatsError,
        nameOfAttendeeError,
      });
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      this.setState({
        ticketsBooked: "*Tickets Booked",
        isModal: true,
      });
      document.getElementById("submitButton").disabled = true;
      document.getElementById("cancelButton").disabled = true;
      console.log(this.state);
    }
  };

  handleOptionChange = async () => {
    const numberOfSeats = document.getElementById("numberOfSeats").value;
    console.log(numberOfSeats);
    if (numberOfSeats !== null) {
      await this.setState({
        noOfSeats: numberOfSeats,
      });
    }
    console.log(this.state.noOfSeats);
  };

  cancelSubmission = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  };

  render() {
    const customStyles = {
      content: {
        color: "black",
        textAlign: "center",
      },
    };

    return (
      <div className={styles.eventBookingContainer}>
        {this.props.eventbookingData &&
          Object.entries(this.props.eventbookingData).map((items) => (
            <div
              key={items[1].event_name}
              className={styles.innerBookingContainer}
            >
              <h1>{items[1].event_name}</h1>

              <p>Number of available seats: {items[1].no_of_seats_available}</p>
              <div className={styles.eventBookingContent}>
                <span className={styles.leftBookingContainer}>
                  <span className={styles.imageBorder}>
                    <span className={styles.imageRound}>
                      <p>Image</p>
                    </span>
                  </span>
                </span>
                <span className={styles.rightBookingContainer}>
                  <form onSubmit={this.handleSubmit}>
                    <div className={styles.label}>
                      <label htmlFor="name">Name:</label>
                    </div>
                    <div className={styles.input}>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                      <div className={styles.errorlogs}>
                        {this.state.nameError}
                      </div>
                    </div>
                    <br />

                    <div className={styles.label}>
                      <label htmlFor="email">Email:</label>
                    </div>
                    <div className={styles.input}>
                      <input
                        type="text"
                        placeholder="Enter your email-id"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={(e) => {
                          this.setState({ email: e.target.value });
                        }}
                      />
                      <div className={styles.errorlogs}>
                        {this.state.emailError}
                      </div>
                    </div>
                    <br />

                    <div className={styles.label}>
                      <label htmlFor="phoneNumber">Phone No:</label>
                    </div>
                    <div className={styles.input}>
                      <input
                        required
                        type="text"
                        placeholder="Enter your phone number"
                        id="phoneNumber"
                        name="phoneNumber"
                        pattern="[0-9]{10}"
                        value={this.state.phoneNo}
                        onChange={(e) => {
                          this.setState({ phoneNo: e.target.value });
                        }}
                      />
                      <div className={styles.errorlogs}>
                        {this.state.phoneNoError}
                      </div>
                    </div>
                    <br />

                    <div className={styles.label}>
                      <label htmlFor="numberOfSeats">Number of seats:</label>
                    </div>
                    <div className={styles.input}>
                      <select
                        id="numberOfSeats"
                        name="numberOfSeats"
                        onChange={this.handleOptionChange}
                      >
                        <option value="null">Select number of seats</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                      <div className={styles.errorlogs}>
                        {this.state.noOfSeatsError}
                      </div>
                    </div>
                    <br />

                    <div className={styles.test}>{items.key}</div>
                    <div className={styles.label}>
                      <label htmlFor="nameOfAttendee">
                        Name of Attendee #2:
                      </label>
                    </div>
                    <div className={styles.input}>
                      <input
                        value={this.state.nameOfAttendee}
                        onChange={(e) => {
                          this.setState({
                            nameOfAttendee: e.target.value,
                          });
                        }}
                        type="text"
                        id="nameOfAttendee"
                        name="nameOfAttendee"
                      />
                      <div className={styles.errorlogs}>
                        {this.state.nameOfAttendeeError}
                      </div>
                    </div>
                    <br />

                    <button
                      type="submit"
                      id="submitButton"
                      className={styles.eventBookingButtons}
                    >
                      Submit
                    </button>
                    <button
                      id="cancelButton"
                      className={styles.eventBookingButtons}
                      onClick={this.cancelSubmission}
                    >
                      Cancel
                    </button>
                  </form>
                </span>
              </div>
            </div>
          ))}

        <Modal isOpen={this.state.isModal} style={customStyles}>
          <div className={styles.outerModal}>
            <div className={styles.ticketsBooked}>
              {this.state.ticketsBooked}
            </div>
            <div className={styles.innerWrapper}>
              <span className={styles.modalHeading}>Name:</span>
              <span className={styles.modalValues}>{this.state.name}</span>
            </div>
            <hr />

            <div className={styles.innerWrapper}>
              <span className={styles.modalHeading}>Email:</span>
              <span className={styles.modalValues}>{this.state.email}</span>
            </div>
            <hr />

            <div className={styles.innerWrapper}>
              <span className={styles.modalHeading}>Phone:</span>
              <span className={styles.modalValues}>{this.state.phoneNo}</span>
            </div>
            <hr />

            <div className={styles.innerWrapper}>
              <span className={styles.modalHeading}>Number of Seats:</span>
              <span className={styles.modalValues}>{this.state.noOfSeats}</span>
            </div>
            <hr />

            <div className={styles.innerWrapper}>
              <span className={styles.modalHeading}>Name of Attendee:</span>
              <span className={styles.modalValues}>
                {this.state.nameOfAttendee}
              </span>
            </div>
            <hr />

            <button
              className={styles.okaybutton}
              onClick={(e) => {
                e.preventDefault();
                this.setState(initialState);
                this.setState({
                  isModal: false,
                });
                this.props.history.push("/");
              }}
            >
              OKAY
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  eventbookingData: state.eventBookingReducer.eventbookingData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    eventBookingAction: (eventId) => dispatch(eventBookingAction(eventId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventBooking);
