import React from 'react';
import {SearchBarContainer, SearchBarInput} from './styles';
import SearchSVG from '../../assets/Search.svg';
import FiltersSVG from '../../assets/Filter.svg';
import {TouchableOpacity} from 'react-native';

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <TouchableOpacity>
        <SearchSVG width={25} height={25} />
      </TouchableOpacity>
      <SearchBarInput
        placeholder="Search Coffee..."
        placeholderTextColor={'#9F9F9F'}
      />
      <TouchableOpacity>
        <FiltersSVG width={35} height={35} />
      </TouchableOpacity>
    </SearchBarContainer>
  );
};

export default SearchBar;
