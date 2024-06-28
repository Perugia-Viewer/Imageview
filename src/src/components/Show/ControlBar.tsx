import { useCallback } from 'react';
import { Box, IconButton, Slide } from '@chakra-ui/react';
import PlayIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ForwardIcon from '@mui/icons-material/ArrowForward';
import BackIcon from '@mui/icons-material/ArrowBack';
import FirstIcon from '@mui/icons-material/FirstPage';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import Dock from '../common/Dock';
import Tooltip from '../common/Tooltip';
import { COLORS, Views } from 'src/utils/constants';
import useUIStateContext from 'src/hooks/useUiStateContext';
import useSettingsContext from 'src/hooks/useSettingsContext';

type Props = {
  isVisible: boolean;
  playing: boolean;
  onForward: () => void;
  onBack: () => void;
  navigateTo: (cursor: number) => void;
  onTogglePlay: (s: boolean) => void;
};

export default function ControlBar({
  isVisible,
  playing,
  onBack,
  onForward,
  navigateTo,
  onTogglePlay,
}: Props) {
  const { setView, isFullscreen, toggleFullscreen } = useUIStateContext();
  const { setIsSettingsModalOpen } = useSettingsContext();
  const handlePlayStateChange = useCallback(
    (s: boolean) => () => {
      onTogglePlay(s);
    },
    [onTogglePlay]
  );

  const handleBackToLoad = useCallback(() => {
    setView(Views.home);
  }, []);

  const onRewind = useCallback(() => {
    navigateTo(0);
  }, [navigateTo]);

  const onOpenSettings = useCallback(() => {
    setIsSettingsModalOpen(true);
  }, []);

  return (
    <Dock>
      <Slide in={isVisible} direction="left">
        <Box
          h="80%"
          w="60px"
          p="4"
          borderRadius="4"
          borderRight="2px"
          borderColor="orange.500"
          background={COLORS.darkGray}
          boxShadow={`0px 0px 49px 0px ${COLORS.darkGray}`}
          ml="4"
          mt="4"
        >
          <Tooltip
            label={playing ? 'Pause' : 'Start'}
            hasArrow
            placement="right"
          >
            {playing ? (
              <IconButton
                variant="hollow"
                onClick={handlePlayStateChange(false)}
                aria-label="pause"
                icon={<PauseIcon />}
              />
            ) : (
              <IconButton
                variant="hollow"
                onClick={handlePlayStateChange(true)}
                aria-label="play"
                icon={<PlayIcon />}
              />
            )}
          </Tooltip>
          <Tooltip label="Forward" hasArrow placement="right">
            <IconButton
              onClick={onForward}
              variant="hollow"
              aria-label="forward"
              icon={<ForwardIcon />}
            />
          </Tooltip>
          <Tooltip label="Back" hasArrow placement="right">
            <IconButton
              variant="hollow"
              onClick={onBack}
              aria-label="back"
              icon={<BackIcon />}
            />
          </Tooltip>
          <Tooltip label="Rewind" hasArrow placement="right">
            <IconButton
              variant="hollow"
              onClick={onRewind}
              aria-label="forward"
              icon={<FirstIcon />}
            />
          </Tooltip>
          <Tooltip label="Toggle fullscreen" hasArrow placement="right">
            <IconButton
              variant="hollow"
              onClick={toggleFullscreen}
              aria-label="files"
              icon={isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            />
          </Tooltip>
          <Tooltip label="Return to file selection" hasArrow placement="right">
            <IconButton
              variant="hollow"
              onClick={handleBackToLoad}
              aria-label="files"
              icon={<FolderIcon />}
            />
          </Tooltip>
          <Tooltip label="Settings" hasArrow placement="right">
            <IconButton
              variant="hollow"
              onClick={onOpenSettings}
              aria-label="settings"
              icon={<SettingsIcon />}
            />
          </Tooltip>
        </Box>
      </Slide>
    </Dock>
  );
}
