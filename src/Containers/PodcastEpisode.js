import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DetailCard from '../Components/DetailCard'
import ACTIONS from '../actions';

import './Styles/PodcastEpisode.css';

export class PodcastDetail extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        idPodcast: props.match.params.id,
        episode: props.match.params.id,
      };
  }

  componentWillMount(){
      const { fetchPodcast, fetchEpisode } = this.props;
      fetchPodcast(this.props.match.params.idPodcast);
      fetchEpisode(this.props.match.params.idPodcast, this.props.match.params.idEpisode);
  }

  renderPodcastDetail(podcast) {
      return (
        <DetailCard data={podcast} />
      );
  }

  render(){
    //console.log(this.state.episode)
    const { episode, podcast } = this.props;
    if (!episode || !podcast) return <span>'No data'</span>
    return (
      <div>
        {this.renderPodcastDetail(podcast)}
        <div className="episode-player">
          <div className="episode-data">
              <span className="title">{episode.title}</span>
              <span className="description"  dangerouslySetInnerHTML={{ __html: episode.description }} />
              <span className="sponsored">{`This episode was sponsored by ${episode.author}`}</span>
          </div>
          <div className="audio-player">
            <audio controls>
                <source src={episode.url} type="audio/ogg" />
            </audio>
          </div>
        </div>
      </div>);
  }
}

export function mapDispatchToProps(dispatch) {
    return bindActionCreators(ACTIONS, dispatch);
}

export function mapStateToProps(state) {
    return {
        episode: state.itunesData.episode,
        podcast: state.itunesData.podcast,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);
