import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery, Message } from './Gallery.styled';
import { useEffect, useRef, useState } from 'react';
import { refs } from 'refs';
import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import { Dna } from 'react-loader-spinner';
import { getImages } from 'fetchApi';

export const ImageGallery = ({ search }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);
  const [toggleState, setToggleState] = useState(true);

  useEffect(() => {
    if (!search) {
      return;
    }
    refs.parameters.q = search;
    setPage(1);
    setImages([]);
    setToggleState(prev => !prev);
  }, [search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    (async () => {
      setIsLoading(true);
      refs.parameters.page = page;
      try {
        fullfillState(await getImages());
      } catch (error) {
        toast('Sorry, some server error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, toggleState]);

  const loadMore = e => {
    setPage(prev => prev + 1);
  };

  const fullfillState = result => {
    if (!result) {
      return;
    }
    setTotal(result.totalHits);
    setImages(prev =>
      prev.concat(
        result.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        }))
      )
    );
  };

  return (
    <>
      <Gallery>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </Gallery>

      {total === 0 && search.length > 0 && !isLoading && (
        <Message>There are no photos for your request</Message>
      )}

      {page > 0 &&
        isLoading === false &&
        total - page * refs.parameters.per_page > 0 && (
          <Button onClick={loadMore} />
        )}

      <Dna
        visible={isLoading}
        height="80"
        width="100%"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </>
  );
};
