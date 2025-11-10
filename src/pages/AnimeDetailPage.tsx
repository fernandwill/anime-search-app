import { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { clearDetail, fetchAnimeDetails } from '@/features/search/searchSlice';

const AnimeDetailPage = () => {
  const { malId } = useParams();
  const dispatch = useAppDispatch();
  const { detail, detailStatus, detailError } = useAppSelector((state) => state.search);
  const mutedText = useColorModeValue('gray.600', 'whiteAlpha.700');
  const cardBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const cardBg = useColorModeValue('white', 'blackAlpha.400');

  useEffect(() => {
    if (!malId) {
      dispatch(clearDetail());
      return;
    }
    const numericId = Number(malId);
    if (Number.isNaN(numericId)) {
      dispatch(clearDetail());
      return;
    }
    const promise = dispatch(fetchAnimeDetails({ malId: numericId }));
    return () => {
      promise.abort();
    };
  }, [malId, dispatch]);

  const isLoading = detailStatus === 'loading';

  return (
    <Stack spacing={6}>
      <Button as={RouterLink} to="/" alignSelf="flex-start" variant="outline" colorScheme="blue">
        Back to search
      </Button>
      {detailError && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {detailError}
        </Alert>
      )}
      <Grid
        templateColumns={{ base: '1fr', lg: '320px 1fr' }}
        gap={8}
        alignItems="flex-start"
        borderWidth="1px"
        borderColor={cardBorder}
        bg={cardBg}
        borderRadius="lg"
        p={{ base: 4, md: 6 }}
      >
        <GridItem>
          {isLoading ? (
            <Skeleton height="420px" borderRadius="lg" />
          ) : (
            <Image
              src={detail?.images?.jpg?.largeImageUrl || detail?.images?.jpg?.imageUrl}
              alt={detail?.title}
              borderRadius="lg"
              objectFit="cover"
              w="100%"
            />
          )}
        </GridItem>
        <GridItem>
          <Heading size="2xl" mb={4}>
            {detail?.title ?? 'Loading anime details'}
          </Heading>
          {detail && (
            <>
              <Text fontSize="lg" color={mutedText}>
                {detail.synopsis}
              </Text>
              <Stack direction="row" spacing={3} mt={4} flexWrap="wrap">
                {detail.score && (
                  <Badge colorScheme="purple" fontSize="md">
                    Score: {detail.score}
                  </Badge>
                )}
                {detail.episodes && (
                  <Badge colorScheme="blue" fontSize="md">
                    Episodes: {detail.episodes}
                  </Badge>
                )}
                {detail.year && (
                  <Badge colorScheme="teal" fontSize="md">
                    {detail.season ? `${detail.season} ${detail.year}` : detail.year}
                  </Badge>
                )}
              </Stack>
              <Box mt={6}>
                <Heading size="md" mb={2}>
                  Genres
                </Heading>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {detail.genres?.length
                    ? detail.genres.map((genre) => (
                        <Badge key={genre.name} colorScheme="gray" variant="subtle">
                          {genre.name}
                        </Badge>
                      ))
                    : 'No genres listed.'}
                </Stack>
              </Box>
              <Box mt={6}>
                <Heading size="md" mb={2}>
                  Additional Info
                </Heading>
                <Stack spacing={1} color={mutedText}>
                  <Text>Status: {detail.status ?? 'Unknown'}</Text>
                  <Text>Duration: {detail.duration ?? 'Unknown'}</Text>
                  {detail.trailerUrl && (
                    <Button as="a" href={detail.trailerUrl} target="_blank" rel="noreferrer" size="sm" mt={2}>
                      Watch trailer
                    </Button>
                  )}
                </Stack>
              </Box>
            </>
          )}
          {!detail && !isLoading && <Text color={mutedText}>Select an anime from the search results.</Text>}
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default AnimeDetailPage;
