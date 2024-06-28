import { useCallback } from 'react';
import { Box, Image, Text, VStack, useToast } from '@chakra-ui/react';

import Dropzone from '../common/Dropzone';
import { filterAndEnrichFiles } from 'src/utils/files.helpers';
import useLibraryContext from 'src/hooks/useLibraryContext';
import useUIStateContext from 'src/hooks/useUiStateContext';
import { Views } from 'src/utils/constants';
import useSettingsContext from 'src/hooks/useSettingsContext';

const DALLE_CAT = 'src/assets/Dalle_Cat.png';

export default function Home() {
  const toast = useToast();
  const { setLibrary } = useLibraryContext();
  const { setView } = useUIStateContext();
  const { generalSettings } = useSettingsContext();

  const handleAddFiles = useCallback(
    (files: File[]) => {
      const acceptedFiles = filterAndEnrichFiles(files);

      if (acceptedFiles.length === 0)
        return toast({
          title: 'No files loaded',
          description:
            'Please check that you have selected supported file formats.',
          status: 'error',
          isClosable: true,
        });

      setLibrary(acceptedFiles, false);
      setView(Views.show);
    },
    [generalSettings.libraryCaching]
  );

  return (
    <Box
      h="full"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src={DALLE_CAT}
        position="fixed"
        objectFit="cover"
        w="full"
        h="full"
        opacity={0.3}
        filter="blur(10px)"
      />
      <VStack
        padding="10"
        borderRadius="4"
        boxShadow="5px 5px 14px 0px rgba(0, 0, 0, 0.4)"
        w="sm"
        h="md"
        zIndex={2}
      >
        <Box overflow="hidden" w="xs" borderRadius="full">
          <Image src={DALLE_CAT} />
        </Box>
        <Text color="#EFDADA" mt="4" opacity="0.5">
          Drop files in, or click here to select
        </Text>
      </VStack>

      <Dropzone zIndex={3} onDrop={handleAddFiles} />
    </Box>
  );
}
