import React from 'react';
import LookupSearch from '../lookup';
import { DEFAULT_LOCATION } from 'settings/variables';
import axios from 'axios';
require('assets/styles/shared/nav-bar.scss');

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      location: DEFAULT_LOCATION,
    };
  }

  componentDidMount() {
    var placeSearch;

    window.initAutocomplete= () => {
      window.autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(this.refs.nearInput),
          {types: ['geocode']});
      autocomplete.addListener('place_changed', this.changeLocation);
    }

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC6NkfO3OYPYXgFRENH-v0hCQfqXDMS9_o&libraries=places&callback=initAutocomplete";
    document.body.appendChild(scriptElement);

  }

  changeLocation = () => {
    var place = window.autocomplete.getPlace();
    this.setState({
      location: place.formatted_address
    });
  }

  changeQuery = (query) => {
    this.setState({query});
  }

  geolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  handleSearch = () => {
    const { location, query } = this.state;
    if (!query) return alert('Enter what you want to see!')
    this.fetchSearchResult(query, location);
  }

  handleClickSuggest = (query) => {
    this.setState({query});
    this.fetchSearchResult(query, this.state.location);
  }

  fetchSearchResult = (query, location) => {
    axios.get('https://www.yelp.com/search_suggest/v2/prefetch', {
      params: {
        find_desc: encodeURIComponent(query),
        find_loc: encodeURIComponent(location),
      }
    }) 
    .then(function (response) {
      // Parse data and save data to parent component
      // this.props.setParentState({});

      // Or dispatch action and save to redux store
      
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { query, location } = this.state;
    return (
      <div className="nav-bar clearfix">
        <div className="nb-wrapper">
          <div className="nb-container">
            <a className="logo" href="/"></a>
            <div className="nb-lookup-wrapper">
              <LookupSearch location={location} changeQuery={this.changeQuery}
                query={query}
                handleClickSuggest ={this.handleClickSuggest}/>
              <div className="lookup-near">
                <div className="lookup-content">
                  <label>Near</label>
                  <input type="text" placeholder="address, neighborhood, city, state or zip"
                    onFocus={this.geolocate} ref="nearInput"
                    defaultValue={DEFAULT_LOCATION}/>
                </div>
              </div>
            </div>
            <button className="btn-search" onClick={this.handleSearch}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
