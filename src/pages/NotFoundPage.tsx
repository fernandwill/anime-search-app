import { Link as RouterLink } from 'react-router-dom';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';

const NotFoundPage = () => (
  <Stack spacing={4} textAlign="center" py={20}>
    <Heading size="2xl">404</Heading>
    <Text color="whiteAlpha.700">Looks like you ventured beyond the anime multiverse.</Text>
    <Button as={RouterLink} to="/" colorScheme="blue" w="fit-content" mx="auto">
      Back to search
    </Button>
  </Stack>
);

export default NotFoundPage;
