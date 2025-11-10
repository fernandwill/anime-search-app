import { PropsWithChildren } from 'react';
import { Box, Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const AppLayout = ({ children }: PropsWithChildren) => {
  const mainBg = useColorModeValue('linear(to-b, gray.50, white)', 'linear(to-b, gray.900, black)');
  const footerBg = useColorModeValue('gray.100', 'blackAlpha.400');
  const footerColor = useColorModeValue('gray.600', 'whiteAlpha.700');
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

  return (
    <Flex direction="column" minH="100vh">
      <AppHeader />
      <Box as="main" flex="1" bgGradient={mainBg} py={8}>
        <Container maxW="7xl">{children ?? <Outlet />}</Container>
      </Box>
      <Box
        as="footer"
        py={6}
        textAlign="center"
        fontSize="sm"
        color={footerColor}
        borderTopWidth="1px"
        borderColor={borderColor}
        bg={footerBg}
      >
        Crafted with React, Redux, Chakra UI, and the Jikan API.
      </Box>
    </Flex>
  );
};

export default AppLayout;
