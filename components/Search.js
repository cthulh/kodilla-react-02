Search = React.createClass({
  getInitialState() {
    return {
      searchingText: '',
      resetSearch: false
    };
  },
  handleChange: function(event) {
    var searchingText = event.target.value;
    this.setState({
      searchingText: searchingText,
      resetSearch: false
    });
    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },
  handleKeyUp: function(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
    if (event.keyCode === 8 || event.keyCode === 46) {
      if (!this.state.resetSearch) {
        this.setState({resetSearch: true});
        this.props.onReset();
      }
    }
  },
  render: function() {
    var styles = {
      fontSize: '1.5em',
      width: '90%',
      maxWidth: '350px'
    };

    return <input
     type='text'
     onChange={this.handleChange}
     onKeyUp={this.handleKeyUp}
     placeholder='Search for a gif'
     style={styles}
     value={this.state.searchingText}
    />
  }
});
