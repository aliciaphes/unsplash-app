import { Reducer } from 'redux';
import { Photo, SearchPhotosResponse } from '../requests';
import { PhotosState } from './store';

type State = { photos: PhotosState };

export const photosReducer: Reducer<PhotosState, Action> = (
  state = { photos: [], errors: [] },
  action,
) => {
  switch (action.type) {
    case 'RESET_STORE':
      return { photos: [], errors: [] };
    case 'SET_PHOTOS_RESPONSE':
      return { photos: action.photosResponse.results, errors: [] };
    case 'SET_ERROR_RESPONSE':
      return { photos: [], errors: action.photosResponse.errors };
    default:
      return state;
  }
};

// selectors
export const getPhotos = (state: State) => state.photos.photos;
export const getErrors = (state: State) => state.photos.errors;

// actions
export const setPhotosResponse = (photosResponse: SearchPhotosResponse) => ({
  // adding `as const` allows the action types to flow correctly inside the reducer.
  type: 'SET_PHOTOS_RESPONSE' as const,
  photosResponse,
});

export const setErrorResponse = (photosResponse: SearchPhotosResponse) => ({
  type: 'SET_ERROR_RESPONSE' as const,
  photosResponse,
});
export const resetStore = () => ({
  type: 'RESET_STORE' as const,
});

type Action = ReturnType<
  | typeof setPhotosResponse
  // Include any additional actions in here like so:
  | typeof setErrorResponse
  | typeof resetStore
>;
