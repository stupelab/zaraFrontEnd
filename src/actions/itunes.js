import axios from 'axios';
import xml2js from 'xml2js';

import * as TYPES from './types';
import Format from '../Utils/Format';
import { CORS_URL } from '../Utils/Constants';

export function fetchPodcasts() {
      return (dispatch) => {
        dispatch(isLoading());
        const localStorageData = JSON.parse(localStorage.getItem('podcastList'));
        if (Format.isNeededNewData(localStorageData)) {
            axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
                .then((response) => {
                    let formatedData = response.data.feed.entry.map((data) => {
                      return Format.formatPodcast(data);
                    });
                    const dataToLocal = {
                      date: new Date(),
                      data: formatedData
                    }
                    dispatch({
                        type: TYPES.FETCH_PODCASTS,
                        payload: formatedData,
                    });
                    localStorage.setItem('podcastList', JSON.stringify(dataToLocal));
                    dispatch(isLoaded());
                }).catch((e) => {
                    console.error(e);
                });
    }else{
        dispatch({
            type: TYPES.FETCH_PODCASTS,
            payload: localStorageData.data,
        });
        dispatch(isLoaded());
    }
  }
}

export function fetchPodcast(podcastId) {
    return (dispatch) => {
        dispatch(isLoading());
        const localStorageData = JSON.parse(localStorage.getItem(`podcast-${podcastId}`));
        if (Format.isNeededNewData(localStorageData)) {
          axios.get(`${CORS_URL}https://itunes.apple.com/lookup?id=${podcastId}`)
              .then((response) => {
                  const result = response.data.results[0];
                  const { feedUrl } = result;
                  return axios.get(`${CORS_URL}${feedUrl}`)
                      .then((response) => {
                          const parser = new xml2js.Parser();
                          const jsonData = new Promise((resolve) => {
                              parser.parseString(response.data, (err, jsonData) => {
                                  resolve(jsonData.rss.channel[0]);
                              });
                          });
                          jsonData.then((data) => {
                                const formatedData = Format.formatPodcastDetail(data, podcastId);
                                const dataToLocal = {
                                  date: new Date(),
                                  data: formatedData,
                                }
                                dispatch({
                                    type: TYPES.FETCH_PODCAST,
                                    payload: formatedData,
                                });
                                dispatch(isLoaded());
                                localStorage.setItem(`podcast-${podcastId}`, JSON.stringify(dataToLocal));
                          });
                      }).catch((e) => {
                          console.error(e);
                      });
              }).catch((e) => {
                  console.error(e);
              });
            } else {
              dispatch({
                  type: TYPES.FETCH_PODCAST,
                  payload: localStorageData.data,
              });
              dispatch(isLoaded());
            }
    };
}

export function fetchEpisode(idPodcast, idEpisode) {
    return (dispatch) => {
      dispatch({
          type: TYPES.FETCH_EPISODE,
          payload:{
            idPodcast,
            idEpisode,
          }
      });
    }
}

export function cleanPodcast() {
    return (dispatch) => {
        dispatch({
            type: TYPES.CLEAN_PODCAST,
        });
    };
}

export function isLoading() {
    return (dispatch) => {
        dispatch({
            type: TYPES.IS_LOADING,
        });
    };
}
export function isLoaded() {
    return (dispatch) => {
        dispatch({
            type: TYPES.IS_LOADED,
        });
    };
}
