import { useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Badge, Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/storeHooks';

const AnimeDetailPage = () => {
  const { malId } = useParams();
  const selected = useAppSelector((state) => state.search.results.find((anime) => String(anime.malId) === malId));

  const fallbackDescription = useMemo(
    () =>
      'Detailed metadata, trailers, and streaming information will appear here once the detail API integration is complete.',
    [],
  );

  return (
    <Stack spacing={6}>
      <Button as={RouterLink} to="/" alignSelf="flex-start" variant="outline" colorScheme="blue">
        Back to search
      </Button>
      <Heading size="2xl">{selected?.title ?? 'Anime detail coming soon'}</Heading>
      <Text fontSize="lg" color="whiteAlpha.700">
        {selected?.synopsis ?? fallbackDescription}
      </Text>
      <Box borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="lg" p={6}>
        <Heading size="md" mb={4}>
          Placeholder Metadata
        </Heading>
        <Stack direction="row" spacing={4}>
          <Badge colorScheme="purple">Episodes: {selected?.episodes ?? 'TBD'}</Badge>
          <Badge colorScheme="orange">Score: {selected?.score ?? 'TBD'}</Badge>
          <Badge colorScheme="blue">Jikan ID: {malId ?? 'N/A'}</Badge>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AnimeDetailPage;
