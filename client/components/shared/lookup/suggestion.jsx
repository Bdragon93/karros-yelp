import React from 'react';
require('assets/styles/shared/list.scss');

class Suggestions extends React.Component {
  handleClick = (key) => {
    this.props.handleClickSuggest(`suggest item ${key}`);
  }

  render() {
    const { suggestion } = this.props;

    if(!suggestion[0]) return false;

    return (
      <div className="lookup-suggestion">
        <ul className="list-suggestion">
          {suggestion.map((res, key) => {
            return <li key={key}>
                      <button onClick={this.handleClick.bind(this, key)}>{`Suggest item ${key}`}</button>
                    </li>
          })}
        </ul>
      </div>
    );
  }
}

export default Suggestions;
