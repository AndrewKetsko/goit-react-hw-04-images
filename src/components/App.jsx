import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
// import { refs } from 'refs';
import ImageGallery from './ImageGallery/ImageGallery';
import { MyApp } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export class App extends Component {
  state = {
    search: '',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  setSearch = search => this.setState({ search });

  render() {
    return (
      <MyApp>
        <ToastContainer />

        <Searchbar
          setSearch={this.setSearch}
          search={this.state.search}
        ></Searchbar>

        <ImageGallery
          search={this.state.search}
        ></ImageGallery>
        
      </MyApp>
    );
  }
}
