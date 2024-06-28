import { invoke } from '@tauri-apps/api/tauri';
import { window as apiWindow, event } from '@tauri-apps/api';
import debounce from 'lodash/debounce';
import generalEventBus, { GeneralEventMessage } from './events/general';

const IN_TAURI = !!window.__TAURI__;

/** Sends a message to print into Tauri's console */
export const tauriPrint = (message: string) =>
  invoke('console_print', { message });

export const tauriPrintDebounced = debounce(tauriPrint, 500, {
  leading: true,
  trailing: false,
});

export const fullscreen = {
  set: (fullscreen: boolean): Promise<void> =>
    IN_TAURI
      ? apiWindow.appWindow.setFullscreen(fullscreen)
      : fullscreen
      ? document.documentElement.requestFullscreen()
      : document.exitFullscreen(),
  isOn: () =>
    IN_TAURI
      ? apiWindow.appWindow.isFullscreen()
      : !!document.fullscreenElement,
};

type Payload = {
  message: GeneralEventMessage;
};

/** Listen to custom events from the Rust wrapper layer */
const attachEventListeners = async () => {
  const menuUnSub = await event.listen<Payload>('menu_event', (e) => {
    generalEventBus.next({ message: e.payload.message });
  });

  const listenerUnSub = await event.listen('tauri://destroyed', () => {
    menuUnSub();
    listenerUnSub();
  });
};

void attachEventListeners();
