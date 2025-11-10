import { useEffect, useMemo } from 'react';
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { clearDetail, fetchAnimeSearch, resetResults, setPage, setPageSize, setQuery } from '@/features/search/searchSlice';
import SearchInput from '@/components/search/SearchInput';
import EmptyState from '@/components/feedback/EmptyState';
import PaginationControls from '@/components/search/PaginationControls';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { query, results, status, error, total, totalPages, page, pageSize } = useAppSelector(
    (state) => state.search,
  );
  const mutedText = useColorModeValue('gray.600', 'whiteAlpha.700');
  const cardBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const cardBg = useColorModeValue('white', 'blackAlpha.400');
  const debouncedQuery = useDebouncedValue(query.trim(), 250);

  const isLoading = status === 'loading';

  const heroDescription = useMemo(
    () =>
      'Search the Jikan API catalog instantly. Start typing and we will fetch anime titles with server-side pagination and cancellation handling.',
    [],
  );

  useEffect(() => {
    dispatch(clearDetail());
  }, [dispatch]);

  useEffect(() => {
    if (!debouncedQuery) {
      dispatch(resetResults());
      return;
    }

    const promise = dispatch(fetchAnimeSearch({ query: debouncedQuery, page, limit: pageSize }));

    return () => {
      promise.abort();
    };
  }, [debouncedQuery, page, pageSize, dispatch]);

  return (
    <Stack spacing={10}>
      <Stack spacing={4} textAlign="center">
        <Heading size="2xl">Discover Your Next Anime</Heading>
        <Text color={mutedText} maxW="2xl" mx="auto">
          {heroDescription}
        </Text>
        <Box maxW="lg" mx="auto" w="full">
          <SearchInput value={query} onChange={(value) => dispatch(setQuery(value))} />
        </Box>
      </Stack>

      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!query && (
        <EmptyState
          title="Start Exploring"
          description="Use the search box above to find anime by title. Results will appear here instantly."
        />
      )}

      {query && (
        <Box>
          <Heading size="md" mb={4}>
            Showing results for "{query}"
          </Heading>
          {total > 0 && (
            <Flex justify="flex-end" mb={4} align="center" gap={3} direction={{ base: 'column', sm: 'row' }}>
              <Text fontSize="sm" color={mutedText}>
                Results per page
              </Text>
              <Select
                maxW="120px"
                value={pageSize}
                onChange={(event) => dispatch(setPageSize(Number(event.target.value)))}
              >
                {[10, 25].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </Flex>
          )}
          {isLoading && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} height="140px" borderRadius="lg" />
              ))}
            </SimpleGrid>
          )}
          {!isLoading && results.length === 0 && (
            <EmptyState
              title="No matches found"
              description="Try adjusting your search terms. The Jikan API indexes official titles, romanji, and English equivalents."
            />
          )}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {results.map((anime) => (
              <Stack
                key={anime.malId}
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                borderWidth="1px"
                borderColor={cardBorder}
                bg={cardBg}
                borderRadius="lg"
                p={4}
              >
                <Image
                  src={anime.images?.jpg?.imageUrl || anime.images?.webp?.imageUrl}
                  alt={anime.title}
                  objectFit="cover"
                  borderRadius="md"
                  w={{ base: '100%', sm: '140px' }}
                  h="140px"
                  fallback={<Skeleton w={{ base: '100%', sm: '140px' }} h="140px" borderRadius="md" />}
                />
                <Box flex="1">
                  <Heading size="sm" mb={2}>
                    {anime.title}
                  </Heading>
                  <Text noOfLines={3} color={mutedText}>
                    {anime.synopsis}
                  </Text>
                  <HStack spacing={4} mt={4} flexWrap="wrap">
                    {typeof anime.score === 'number' && (
                      <Badge colorScheme="purple" variant="solid">
                        Score: {anime.score.toFixed(1)}
                      </Badge>
                    )}
                    {typeof anime.episodes === 'number' && (
                      <Badge colorScheme="blue" variant="subtle">
                        Episodes: {anime.episodes}
                      </Badge>
                    )}
                  </HStack>
                  <Button
                    as={RouterLink}
                    to={`/anime/${anime.malId}`}
                    size="sm"
                    mt={4}
                    colorScheme="brand"
                    variant="solid"
                  >
                    View details
                  </Button>
                </Box>
              </Stack>
            ))}
          </SimpleGrid>
          <PaginationControls
            currentPage={page}
            totalPages={totalPages || Math.ceil(total / pageSize) || 1}
            totalItems={total}
            isLoading={isLoading}
            onPageChange={(nextPage) => dispatch(setPage(nextPage))}
          />
        </Box>
      )}
    </Stack>
  );
};

export default SearchPage;
