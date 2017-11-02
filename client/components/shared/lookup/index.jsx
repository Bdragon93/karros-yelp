import React from 'react';
import Suggestion from './suggestion';
import axios from 'axios';

class Lookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: [],
      hide: false,
    };
  }

  componentDidMount() {
      document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleChange = (e) => {
    const query = e.target.value.trim();
    const { location, changeQuery } = this.props;

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!query) 
        return this.setState({suggestion: []})

      // Just for test
      this.setState({
        suggestion: ['a', 'b', 'c'] 
      });
      changeQuery(query);

      axios.get('https://www.yelp.com/search_suggest/v2/prefetch', {
        params: {
          prefix: encodeURIComponent(query),
          loc: encodeURIComponent(location),
        }
      }) 
      .then(function (response) {
        // Parse data and set state from response here
        // Or dispatch action and save to redux store

        const resData = [];
        response.data.response.suggestion.map(suggest => {
          // Process to parse data and save here
          resData.push();
        });
        this.setState({
          //suggestion: resData 
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, 300);
  }

  handleOutsideClick = (e) => {
    if (!this.refs.lookupSearch.contains(e.target)) {
      this.setState({hide: true});
    }
  }

  handleFocus = () => {
    this.setState({hide: false});
  }

  handleClickSuggest = (query) => {
    this.refs.lookupInput.value = query;
    this.setState({hide: true, query});
    this.props.handleClickSuggest(query);
  }

  render() {
    const { suggestion, hide } = this.state;

    return (
      <div className={`lookup-search${!suggestion[0] || hide ? '' : ' has-suggest'}`} ref="lookupSearch">
        <div className="lookup-content">
          <label>Find</label>
          <input type="text" onChange={this.handleChange} placeholder="tacos, cheap dinner, Max’s"
            onFocus={this.handleFocus} ref="lookupInput"/>
            {!hide && <Suggestion suggestion={suggestion} handleClickSuggest={this.handleClickSuggest}/>}
        </div>
      </div>
    );
  }
}

export default Lookup;
