import { refs } from 'refs';
import axios from 'axios';

export const getImages = async () => {
  const searchParameters = new URLSearchParams(refs.parameters);
  const getURL = `${refs.URL}?${searchParameters}`;
  const response = await axios.get(getURL);
  return response.data;
};
