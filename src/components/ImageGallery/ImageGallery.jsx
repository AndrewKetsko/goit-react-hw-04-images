import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery, Message } from './Gallery.styled';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { refs } from 'refs';
import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import { Dna } from 'react-loader-spinner';

export const ImageGallery = ({ search }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      return;
    }
    submitNewSearch();
  }, [search]);

  const getPhotos = async () => {
    setIsLoading(true);
    refs.parameters.q = search;
    // refs.parameters.page += 1;
    refs.parameters.page = page;
    const searchParameters = new URLSearchParams(refs.parameters);
    const getURL = `${refs.URL}?${searchParameters}`;
    console.log(refs.parameters.page);

    try {
      const response = await axios.get(getURL);
      return response.data;
    } catch (error) {
      toast('Sorry, some server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitNewSearch = async () => {
    // refs.parameters.page = 0;
    await setPage(1);
    await setImages([]);
    const result = await getPhotos();
    await fullfillState(result);
  };

  const loadMore = async e => {
    const result = await getPhotos();
    await fullfillState(result);
  };

  const fullfillState = result => {
    if (!result) {
      return;
    }
    // refs.parameters.page += 1;
    setPage(prev => prev + 1);
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

      {/* {refs.parameters.page > 0 && */}
      {page > 0 &&
        isLoading === false &&
        // total - refs.parameters.page * refs.parameters.per_page > 0 && (
        total - (page-1) * refs.parameters.per_page > 0 && (
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
