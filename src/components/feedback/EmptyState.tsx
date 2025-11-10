import { ReactNode } from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.700');
  const bg = useColorModeValue('white', 'blackAlpha.400');

  return (
    <Box borderWidth="1px" borderColor={borderColor} borderRadius="lg" p={10} textAlign="center" bg={bg}>
      <Heading size="md" mb={4}>
        {title}
      </Heading>
      <Text color={textColor} maxW="lg" mx="auto">
        {description}
      </Text>
      {action && <Box mt={6}>{action}</Box>}
    </Box>
  );
};

export default EmptyState;
