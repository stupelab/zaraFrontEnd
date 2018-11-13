import * as TYPES from '../actions/types';

const INITIAL_STATE = {
    podcasts: null,
    podcast: null,
    episode: null,
    loading: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPES.FETCH_PODCASTS:
            if (!action.payload) return state;
            return { ...state, podcasts: action.payload };
        case TYPES.FETCH_PODCAST:
            if (!action.payload) return state;
            return { ...state, podcast: action.payload };
        case TYPES.CLEAN_PODCAST:
            if (!action.payload) return state;
            return { ...state, podcast: [] };
        case TYPES.FETCH_EPISODE:
            if (!action.payload) return state;
            const podcast = state.podcast;
            const episode = state.podcast.items.find((i) => i.id === parseInt(action.payload.idEpisode, 10));
            return { ...state, episode: episode, podcast: podcast};
        case TYPES.IS_LOADING:
            return { ...state, loading: true};
        case TYPES.IS_LOADED:
            return { ...state, loading: false};
        default:
            return state;
    }
}
