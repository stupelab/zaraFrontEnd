import React from 'react';
import { Link } from 'react-router-dom';

import './Styles/DetailCard.css';

class DetailCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        const { data } = this.props;

        return (
          <div className="detail-card">
            <div className="image-container"><Link to={`/podcast/${data.id}`} className="link"><img src={data.image} alt={data.title} /></Link></div>
            <div className="main-section">
              <span className="title"><Link to={`/podcast/${data.id}`} className="link">{data.title}</Link></span>
              <span className="author"><Link to={`/podcast/${data.id}`} className="link">by {data.author}</Link></span>
            </div>
            <div className="description-section">
              <span className="description-title">Description:</span>
              <span className="description" dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          </div>
        );
    }
}

export default DetailCard;
