import { Button, Form, Input, Label, Search } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

export const Searchbar = ({ setSearch, search }) => {
  
  const submitForm = e => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim().split(' ').join('+');
    if (!searchValue) {
      toast('Enter some word to search');
      return;
    }
    if (search === searchValue) {
      toast('Enter new search please');
      return;
    }
    setSearch(searchValue);
  };

  return (
    <Search>
      <Form onSubmit={submitForm}>
        <Button type="submit">
          <BsSearch></BsSearch>
          <Label>Search</Label>
        </Button>

        <Input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Search>
  );
};
