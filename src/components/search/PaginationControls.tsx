import { Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  totalItems,
  isLoading,
  onPageChange,
}: PaginationControlsProps) => {
  if (!totalItems) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Flex align="center" justify="space-between" mt={6} direction={{ base: 'column', md: 'row' }} gap={4}>
      <Text fontWeight="semibold">
        Page {currentPage} of {Math.max(totalPages, 1)} - {totalItems.toLocaleString()} results
      </Text>
      <ButtonGroup isAttached variant="outline">
        <Button onClick={handlePrev} isDisabled={currentPage <= 1 || isLoading}>
          Previous
        </Button>
        <Button onClick={handleNext} isDisabled={currentPage >= totalPages || isLoading}>
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default PaginationControls;
