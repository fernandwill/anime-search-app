import { PropsWithChildren } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const AppLayout = ({ children }: PropsWithChildren) => (
  <Flex direction="column" minH="100vh">
    <AppHeader />
    <Box as="main" flex="1" bgGradient="linear(to-b, gray.900, black)" py={8}>
      <Container maxW="7xl">{children ?? <Outlet />}</Container>
    </Box>
    <Box as="footer" py={6} textAlign="center" fontSize="sm" color="whiteAlpha.700">
      Crafted with React, Redux, Chakra UI, and the Jikan API.
    </Box>
  </Flex>
);

export default AppLayout;
