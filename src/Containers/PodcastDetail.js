import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailCard from '../Components/DetailCard'
import ACTIONS from '../actions';

import './Styles/PodcastDetail.css';

export class PodcastDetail extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }

  componentDidMount(){
      const { fetchPodcast, cleanPodcast } = this.props;
      cleanPodcast();
      fetchPodcast(this.props.match.params.id);
  }

  renderPodcastDetail(podcast) {
      return (
          <DetailCard data={podcast} />
      );
  }

  renderPodcastItemsList(podcast) {
      const { history } = this.props;
      const {items} = podcast;

      const listTitles = (
        <div className="list-titles">
          <span className="title-title">Title</span>
          <span className="title-date">Date</span>
          <span className="title-duration">Duration</span>
        </div>
      );

      const itemsCount = (
        <span className="episodes-count">
          {`Episodes: ${items.length}`}
        </span>
      );

      const itemsList = items.map((item, idx) => {
        return (
          <div className={`item ${idx % 2 === 0 ? 'pair' : 'odd'}`} key={`item-${item.id}`}>
              <div className="title" onClick={() => { history.push({pathname:`/podcast/${podcast.id}/episode/${item.id}`, state: { item, podcast }}); }} title={item.title}>{item.title}</div>
              <div className="date">{item.pubDate}</div>
              <div className="duration">{item.duration}</div>
          </div>
      )});

      return (
        <div className="podcast-episodes">
         {itemsCount}
          <div className="podcast-detail-list">
              {listTitles}
              {itemsList}
            </div>
        </div>
      );
  }

  render(){
    const { podcast, loading } = this.props;
    if(!podcast || loading) return 'There is not data available or it is being loaded';

    const podcastDetail = (
      <div className="podcast-detail-section">
        {this.renderPodcastDetail(podcast)}
        {this.renderPodcastItemsList(podcast)}
      </div>);

    return podcastDetail;

  }
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(ACTIONS, dispatch);
}

export function mapStateToProps(state) {
    return {
        podcast: state.itunesData.podcast,
        loading: state.itunesData.loading,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
