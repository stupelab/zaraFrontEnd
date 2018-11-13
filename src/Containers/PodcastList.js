import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ACTIONS from '../actions';

import './Styles/PodcastList.css';

export class PodcastList extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        searchText: '',
        isLoading: true,
      };
  }

  componentDidMount(){
    const { fetchPodcasts } = this.props;
    fetchPodcasts();
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.podcasts){
        this.setState({ podcastFiltered: nextProps.podcasts, numResults: nextProps.podcasts.length });
      }
  }

  searchPodcasts() {
      const { searchText, numResults } = this.state;
      return (
        <div className="searcher-bar">
          <span className="search-module">
            <div className="number-results">{numResults}</div>
            <input
                type="text"
                className="input-search-podcast"
                name="searchText"
                value={searchText || ''}
                onChange={ (e) => { this.searcherPodcasts(e.target.value); }}
                placeholder="Filter podcasts..."
            />
          </span>
        </div>);
  }

  searcherPodcasts(searchText) {
    const { podcasts } = this.props;
    const podcastFiltered = podcasts.filter((podcast) =>  podcast.title.toLowerCase().includes(searchText.toLowerCase()) || podcast.author.toLowerCase().includes(searchText.toLowerCase()) );
    const numResults = podcastFiltered.length
    this.setState({ numResults, podcastFiltered, searchText });
  }

  renderCards() {
      const { history, fetchPodcast } = this.props;
      const { podcastFiltered } = this.state;
      if(!podcastFiltered) return <div>No podcasts available</div>
      const podcastList = podcastFiltered.map((podcast) => {
        return (
          <div key={`podcast-${podcast.title}`} className="podcast-card"  onClick={() => { fetchPodcast(podcast.id); history.push(`/podcast/${podcast.id}`); }}>
            <span className="podcast-data">
                <div className="podcast-image"><img src={podcast.image} alt={podcast.title}/></div>
                <div className="title">{podcast.title}</div>
                <div className="author">{podcast.author}</div>
            </span>
          </div>
        )});
      return (<div className="podcast-list">{podcastList}</div>);
  }

  render() {
    return (
      <div className="podcaster-home">
          {this.searchPodcasts()}
        <div className="podcaster-list">
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(ACTIONS, dispatch);
}

export function mapStateToProps(state) {
    return {
      podcasts: state.itunesData.podcasts,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastList);
