import { Component, useState } from 'react';
import {Searchbar} from './Searchbar/Searchbar';
// import { refs } from 'refs';
import {ImageGallery} from './ImageGallery/ImageGallery';
import { MyApp } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  const [search, setSearch] = useState('');

    return (
      <MyApp>
        <ToastContainer />

        <Searchbar
          setSearch={setSearch}
          search={search}
        ></Searchbar>

        <ImageGallery
          search={search}
        ></ImageGallery>
        
      </MyApp>
    );
  }
