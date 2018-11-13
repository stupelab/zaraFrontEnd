import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Header from './Containers/Header';
import PodcastList from './Containers/PodcastList';
import PodcastDetail from './Containers/PodcastDetail';
import PodcastEpisode from './Containers/PodcastEpisode';
import reducers from './reducers';

import './index.css';

const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
          <BrowserRouter>
              <div>
                <Header />
                <Route exact path="/" component={PodcastList} />
                <Route exact path="/podcast/:id" component={PodcastDetail}/>
                <Route exact path="/podcast/:idPodcast/episode/:idEpisode" component={PodcastEpisode} />
              </div>
          </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
