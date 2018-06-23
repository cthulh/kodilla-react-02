var GIPHY_PUB_KEY = 'VNYeQQ0R9sPKxGEU9afLo8B5HDXcFGNH';
var GIPHY_API_URL = 'http://api.giphy.com';

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },
  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText, gif => {
      this.setState({
          loading: false,
          gif: gif,
          searchingText: searchingText
        });
    });
  },
  getGif: function(searchingText, callback) {
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText).data;
        var gif = {
          url: data.fixed_width_downsampled_url,
          sourceUrl: data.url
        };
        callback(gif);
      }
    };
    xhr.send();
  },
  onReset: function(){
    this.setState({
      loading: false,
      gif: {},
      searchingText: ''
    });
  },
  render: function() {

    var styles = {
      textAlign: 'center',
      width: '100%'
    };

    return (
      <div style={styles}>
        <h1 className='header'>Gif Search</h1>
        <p>Find a gif at <a href='http://giphy.com'>giphy</a>. Press ENTER, to load another gif.</p>
        <Search onSearch={this.handleSearch} onReset={this.onReset}/>
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
