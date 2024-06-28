import {
  extendTheme,
  defineStyle,
  defineStyleConfig,
  ComponentStyleConfig,
} from '@chakra-ui/react';
import { COLORS } from './constants';

const VStack: ComponentStyleConfig = {
  baseStyle: {
    alignItems: 'flex-start',
  },
};

const IconButton: ComponentStyleConfig = defineStyleConfig({
  variants: {
    hollow: {
      background: 'none',
      color: 'gray.200',
    },
  },
  baseStyle: defineStyle({
    background: 'unset',
    color: 'gray.200',
  }),
});

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  fonts: {
    body: 'Verdana, system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
  styles: {
    global: {
      body: {
        background: COLORS.darkGray,
        height: 'full',
        width: 'full',
        userSelect: 'none',
      },
    },
  },
  components: {
    VStack,
    IconButton,
  },
});

export default theme;
