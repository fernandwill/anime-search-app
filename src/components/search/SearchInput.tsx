import { ChangeEvent } from 'react';
import { Input, InputGroup, InputLeftElement, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = 'Search for anime titles...' }: SearchInputProps) => {
  const inputBg = useColorModeValue('white', 'whiteAlpha.50');
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const placeholderColor = useColorModeValue('gray.500', 'whiteAlpha.500');
  const iconColor = useColorModeValue('gray.400', 'whiteAlpha.500');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color={iconColor} />
      </InputLeftElement>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        borderRadius="full"
        bg={inputBg}
        borderColor={borderColor}
        focusBorderColor="brand.400"
        _placeholder={{ color: placeholderColor }}
      />
    </InputGroup>
  );
};

export default SearchInput;
