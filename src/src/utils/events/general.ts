import { Subject } from 'rxjs';

const generalEventBus = new Subject<GeneralEvent>();

export default generalEventBus;

export enum GeneralEventMessage {
  /** A request to open the settings dialogue */
  settings = 'settings',
  /** idb has been initialized */
  idbReady = 'idbReady',
}

export type GeneralEvent = {
  message: GeneralEventMessage;
};
