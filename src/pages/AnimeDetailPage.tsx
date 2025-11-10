import { useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Badge, Box, Button, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/storeHooks';

const AnimeDetailPage = () => {
  const { malId } = useParams();
  const selected = useAppSelector((state) => state.search.results.find((anime) => String(anime.malId) === malId));
  const mutedText = useColorModeValue('gray.600', 'whiteAlpha.700');
  const cardBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const cardBg = useColorModeValue('white', 'blackAlpha.400');

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
      <Text fontSize="lg" color={mutedText}>
        {selected?.synopsis ?? fallbackDescription}
      </Text>
      <Box borderWidth="1px" borderColor={cardBorder} borderRadius="lg" p={6} bg={cardBg}>
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
