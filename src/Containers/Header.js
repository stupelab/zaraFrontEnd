import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ACTIONS from '../actions';

import './Styles/Header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.loading){
          this.setState({ isLoading: nextProps.loading });
        }
    }

    render(){
        const { loading } = this.props;
        return (
          <div className="header">
            <Link to="/" className="home-link">
              Podcaster
            </Link>
            {loading ? <span className="loader" /> : null}
         </div>
        );
    }
}


export function mapDispatchToProps(dispatch) {
    return bindActionCreators(ACTIONS, dispatch);
}

export function mapStateToProps(state) {
    return {
        loading: state.itunesData.loading,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
