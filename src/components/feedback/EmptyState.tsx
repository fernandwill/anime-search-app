import { ReactNode } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <Box
    borderWidth="1px"
    borderColor="whiteAlpha.200"
    borderRadius="lg"
    p={10}
    textAlign="center"
    bg="blackAlpha.400"
  >
    <Heading size="md" mb={4}>
      {title}
    </Heading>
    <Text color="whiteAlpha.700" maxW="lg" mx="auto">
      {description}
    </Text>
    {action && <Box mt={6}>{action}</Box>}
  </Box>
);

export default EmptyState;
