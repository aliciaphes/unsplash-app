import { combineReducers, createStore } from 'redux';
import { photosReducer } from './photos';
import { Photo } from '../requests';

const reducers = combineReducers({
  photos: photosReducer,
});

export type PhotosState = {
  photos: Photo[];
  errors: string[];
};

export const mapStatetoProps = (state: PhotosState): PhotosState => {
  return {
    photos: state.photos,
    errors: state.errors,
  };
};

export const photoStore = createStore(
  reducers,
  // This enables the redux devtools chrome extension.
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__(),
);
