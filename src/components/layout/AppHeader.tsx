import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';

const AppHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('whiteAlpha.900', 'gray.900');
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

  return (
    <Box as="header" borderBottomWidth="1px" borderColor={borderColor} bg={bg} position="sticky" top={0} zIndex={10}>
      <Flex maxW="7xl" mx="auto" py={4} px={{ base: 4, md: 8 }} align="center" justify="space-between">
        <Heading size="md" color="brand.400">
          <RouterLink to="/">Anime Atlas</RouterLink>
        </Heading>

        <HStack spacing={6} align="center">
          <Link as={RouterLink} to="/" fontWeight="semibold">
            Search
          </Link>
          <Link as={RouterLink} to="/anime/preview" fontWeight="semibold">
            Details
          </Link>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default AppHeader;
