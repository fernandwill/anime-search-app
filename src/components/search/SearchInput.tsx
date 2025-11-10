import { ChangeEvent } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = 'Search for anime titles...' }: SearchInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="whiteAlpha.500" />
      </InputLeftElement>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        borderRadius="full"
        bg="whiteAlpha.50"
        borderColor="whiteAlpha.200"
        focusBorderColor="brand.400"
        _placeholder={{ color: 'whiteAlpha.500' }}
      />
    </InputGroup>
  );
};

export default SearchInput;
