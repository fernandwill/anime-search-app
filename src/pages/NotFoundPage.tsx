import { Link as RouterLink } from 'react-router-dom';
import { Button, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const NotFoundPage = () => {
  const mutedText = useColorModeValue('gray.600', 'whiteAlpha.700');

  return (
    <Stack spacing={4} textAlign="center" py={20}>
      <Heading size="2xl">404</Heading>
      <Text color={mutedText}>Looks like you ventured beyond the anime multiverse.</Text>
      <Button as={RouterLink} to="/" colorScheme="blue" w="fit-content" mx="auto">
        Back to search
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
