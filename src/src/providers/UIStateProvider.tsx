import React, { createContext, useEffect, useState } from 'react';
import { AlertProps } from '@chakra-ui/react';

import { Views } from 'src/utils/constants';
import { fullscreen } from 'src/utils/tauriAdapter';
import generalEventBus, { GeneralEventMessage } from 'src/utils/events/general';

type AlertMessage = {
  message: string;
  status: AlertProps['status'];
};

type AlertState = AlertMessage | null;

interface UIStateContextValues {
  loading: boolean;
  setLoading: (state: boolean) => void;
  alert: AlertState;
  setAlert: (alert: AlertState) => void;
  view: Views;
  setView: (v: Views) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const UIStateContext = createContext<UIStateContextValues>({
  loading: false,
  setLoading: (_) => {},
  alert: null,
  setAlert: (_) => {},
  view: Views.home,
  setView: (_) => {},
  isFullscreen: false,
  toggleFullscreen: () => {},
});

interface ProviderProps {}

const UIStateProvider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);
  const [view, setView] = useState(Views.home);
  const [isFullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    const currentlyFullscreen = await fullscreen.isOn();
    await fullscreen.set(!currentlyFullscreen);
    setFullscreen(!currentlyFullscreen);
  };

  useEffect(() => {
    const sub = generalEventBus.subscribe((e) => {
      switch (e.message) {
        case GeneralEventMessage.fullscreen:
          toggleFullscreen();
          break;
        default:
      }
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <UIStateContext.Provider
      value={{
        loading,
        setLoading,
        alert,
        setAlert,
        view,
        setView,
        isFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

export default UIStateProvider;
