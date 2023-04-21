import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery, Message } from './Gallery.styled';
import { Component } from 'react';
import axios from 'axios';
import { refs } from 'refs';
import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import { Dna } from 'react-loader-spinner';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    total: 0,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.submitNewSearch();
    }
  }

  getPhotos = async () => {
    this.setState({ isLoading: true });
    refs.parameters.q = this.props.search;
    refs.parameters.page = this.state.page;
    const searchParameters = new URLSearchParams(refs.parameters);
    const getURL = `${refs.URL}?${searchParameters}`;

    try {
      const response = await axios.get(getURL);
      return response.data;
    } catch (error) {
      toast('Sorry, some server error. Please try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  submitNewSearch = async () => {
    await this.setState({
      page: 1,
      images: [],
    });

    const result = await this.getPhotos();
    await this.fullfillState(result);
  };

  loadMore = async e => {
    const result = await this.getPhotos();
    await this.fullfillState(result);
  };

  fullfillState = result => {
    if (!result) {
      return;
    }
    this.setState(prev => {
      return {
        page: prev.page + 1,
        total: result.totalHits,
        images: prev.images.concat(
          result.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          }))
        ),
      };
    });
  };

  render() {
    const { images, page, total, isLoading } = this.state;
    return (
      <>
        <Gallery>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </Gallery>

        {total === 0 && this.props.search.length > 0 && !isLoading && (
          <Message>There are no photos for your request</Message>
        )}

        {page > 1 &&
          isLoading === false &&
          total - page * refs.parameters.per_page > 0 && (
            <Button onClick={this.loadMore} />
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
  }
}
