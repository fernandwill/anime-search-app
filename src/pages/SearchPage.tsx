import { useMemo } from 'react';
import { Box, Heading, Stack, Text, SimpleGrid, Skeleton, Badge, HStack, useColorModeValue } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { setQuery } from '@/features/search/searchSlice';
import SearchInput from '@/components/search/SearchInput';
import EmptyState from '@/components/feedback/EmptyState';

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { query, results, status } = useAppSelector((state) => state.search);
  const mutedText = useColorModeValue('gray.600', 'whiteAlpha.700');
  const cardBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const cardBg = useColorModeValue('white', 'blackAlpha.400');

  const isLoading = status === 'loading';

  const heroDescription = useMemo(
    () =>
      'Search the Jikan API catalog instantly. Start typing and we will fetch anime titles with server-side pagination and cancellation handling.',
    [],
  );

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
              <Box key={anime.malId} borderWidth="1px" borderColor={cardBorder} bg={cardBg} borderRadius="lg" p={4}>
                <Heading size="sm" mb={2}>
                  {anime.title}
                </Heading>
                <Text noOfLines={3} color={mutedText}>
                  {anime.synopsis ?? 'Synopsis unavailable.'}
                </Text>
                <HStack spacing={4} mt={4}>
                  {anime.score && (
                    <Badge colorScheme="purple" variant="subtle">
                      Score: {anime.score}
                    </Badge>
                  )}
                  {anime.episodes && (
                    <Badge colorScheme="blue" variant="subtle">
                      Episodes: {anime.episodes}
                    </Badge>
                  )}
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Stack>
  );
};

export default SearchPage;
