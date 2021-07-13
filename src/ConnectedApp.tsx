import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, DispatchProp } from 'react-redux';
import { getSearchPhotos, Photo, SearchPhotosResponse } from './requests';
import {
  setPhotosResponse,
  setErrorResponse,
  getPhotos,
  getErrors,
  resetStore,
} from './store/photos';
import { photoStore, mapStatetoProps } from './store/store';
import ThumbsUp from './icons/thumbs-up';
import ThumbsUpSolid from './icons/thumbs-up-solid';

const SearchForm: React.FC<{
  queryValue: string;
  onChange: (query: string) => void;
  onClickButton: () => void;
}> = ({ queryValue, onChange, onClickButton }) => {
  const inputOnChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    event => {
      onChange(event.currentTarget.value);
    },
    [onChange],
  );
  return (
    <div className="search-section">
      <label>
        Search:{' '}
        <input
          className="searchFormInput"
          placeholder={'beautiful photos'}
          type="search"
          value={queryValue}
          onChange={inputOnChange}
        />
      </label>
      <div className="button-clear">
        <button
          onClick={(e: React.MouseEvent): void => {
            onClickButton();
          }}
        >
          clear
        </button>
      </div>
    </div>
  );
};

const LikeButton: React.FC<{
  classes: string;
  onClickFunction: () => void;
  overlayVisible: boolean;
}> = ({ classes, onClickFunction, overlayVisible }) => {
  return (
    <div className={classes}>
      <button
        onClick={(e: React.MouseEvent) => {
          onClickFunction();
        }}
      >
        {overlayVisible
          ? ThumbsUpSolid('button-like')
          : ThumbsUp('button-like')}
      </button>
    </div>
  );
};

const PhotoCard: React.FC<{
  id: string;
  urls: { regular: string; raw: string };
  altDescription: string;
}> = ({ id, urls, altDescription }) => {
  const [likeButtonVisible, showLikeButton] = React.useState(false);
  const [overlayVisible, toggleOverlay] = React.useState(false);

  const src = urls.regular;

  const toggleFunction = () => {
    toggleOverlay(!overlayVisible);
  };

  return (
    <div
      className="foto"
      onMouseEnter={e => {
        showLikeButton(true);
      }}
      onMouseLeave={e => {
        showLikeButton(false);
      }}
    >
      {likeButtonVisible && (
        <LikeButton
          classes={`button-container ${likeButtonVisible ? '' : 'invisible'}`}
          onClickFunction={toggleFunction}
          overlayVisible={overlayVisible}
        />
      )}
      <LikeButton
        classes="button-container-mobile"
        onClickFunction={toggleFunction}
        overlayVisible={overlayVisible}
      />
      {overlayVisible && <div className="overlay"></div>}
      <img className="photoImg" src={src} key={id} alt={altDescription} />
    </div>
  );
};

const Gallery: React.FC<{
  photos: Photo[];
}> = ({ photos }) => (
  <div className="gallery">
    {photos.map((p: Photo, index: number) => {
      const { id, urls, alt_description } = p;
      return (
        <React.Fragment key={index}>
          <PhotoCard id={id} urls={urls} altDescription={alt_description} />
        </React.Fragment>
      );
    })}
  </div>
);

const ErrorBlock: React.FC<{
  errors: string[];
}> = ({ errors }) => (
  <div>
    <p>The following error(s) occurred:</p>
    {errors.map((err: string, index: number) => (
      <p key={index}>{err}</p>
    ))}
  </div>
);

const App: React.FC<DispatchProp> = ({ dispatch }) => {
  const [query, setQuery] = React.useState('');

  const newSearch = (newQuery: string): void => {
    // set store to initial state
    dispatch(resetStore());
    setQuery(newQuery);
  };

  React.useEffect(() => {
    const state = photoStore.getState();
    const photos = getPhotos(state);
    const errors = getErrors(state);

    if (query.length > 0 && photos.length === 0 && errors.length === 0) {
      getSearchPhotos(query).then((response: SearchPhotosResponse) => {
        if (response.errors) {
          dispatch(setErrorResponse(response));
        } else {
          dispatch(setPhotosResponse(response));
        }
      });
    }
  }, [query]);

  const state = photoStore.getState();
  const photos = getPhotos(state);
  const errors = getErrors(state);

  return (
    <div className="appDiv">
      <SearchForm
        queryValue={query}
        onChange={newSearch}
        onClickButton={(): void => {
          setQuery('');
        }}
      />
      {errors.length > 0 && <ErrorBlock errors={errors} />}
      {photos.length > 0 && <Gallery photos={photos} />}
    </div>
  );
};

export const ConnectedApp = connect(mapStatetoProps)(App);
