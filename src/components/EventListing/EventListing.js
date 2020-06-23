import React, { Component } from "react";
import styles from "../EventListing/EventListing.module.css";
import { connect } from "react-redux";
import inputSearchAction from "../../actions/inputSearchAction";

class EventListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
    };
  }

  componentDidMount() {
    this.props.inputSearchAction();
  }

  searchHandler = async (e) => {
    this.props.inputSearchAction();
    await this.setState({
      inputValue: e.target.value,
    });
  };

  bookNowButtonHandler = (e, eventId) => {
    console.log(eventId);
    console.log(this.props.history.push(`/eventbooking/${eventId}`));
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="SEARCH EVENT"
          className={styles.searchBar}
          value={this.state.inputValue}
          onChange={(e) => this.searchHandler(e)}
        />
        <div className={styles.eventDetailContainer}>
          {this.props.eventData &&
            Object.entries(this.props.eventData).map((item) =>
              item[1].event_details.event_name.includes(
                this.state.inputValue.toUpperCase()
              ) ? (
                <div key={item[0]} className={styles.innerCardContainer}>
                  <h3>{item[1].event_details.event_name}</h3>
                  <div className={styles.imageAndDetails}>
                    <span className={styles.imageSquare}>
                      <span className={styles.imageRound}>
                        <h5>Image</h5>
                      </span>
                    </span>
                    <span className={styles.otherDetails}>
                      <p>{item[1].event_details.date_of_event}</p>
                      <p>
                        Seats Available:{" "}
                        {item[1].event_details.no_of_seats_available}
                      </p>
                      {item[1].event_details.no_of_seats_available > 0 ? (
                        <button
                          className={styles.eventListingButtons}
                          onClick={(e, eventId) => {
                            this.bookNowButtonHandler(e, item[0]);
                          }}
                        >
                          Book Now
                        </button>
                      ) : (
                        <button className={styles.eventListingButtons} disabled>
                          Sold Out
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  eventData: state.inputSearchReducer.eventData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    inputSearchAction: () => dispatch(inputSearchAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListing);
