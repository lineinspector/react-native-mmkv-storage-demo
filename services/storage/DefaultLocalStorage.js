import MMKVStorage from 'react-native-mmkv-storage';
import Logger from '../logger';

export const INSTANCE_ID = 'LineInspectorV1';

export default class LocalStorage {
  constructor(instanceId) {
    this.instanceId = instanceId;
    this.storage = new MMKVStorage.Loader().withInstanceID(this.instanceId).initialize();
  }

  /**
   * Initialize storage
   */
  initialize = async () => {
    Logger.debug('LocalStorage.initialize()');
  };

  setItem(key, value, logCall = true) {
    if (logCall) {
      Logger.debug(`LocalStorage.setItem(${key})`);
    }
    return this.storage.setStringAsync(key, value);
  }

  async getItem(key, logCall = true) {
    if (logCall) {
      Logger.debug(`LocalStorage.getItem(${key})`);
    }

    const value = await this.storage.getStringAsync(key);

    // getStringAsync returns undefined if the key is not found, the localStorage interface
    // requires returning a null when the key is missing
    return value === undefined ? null : value;
  }

  removeItem(key, logCall = true) {
    if (logCall) {
      Logger.debug(`LocalStorage.removeItem(${key})`);
    }
    return this.storage.removeItem(key);
  }

  clear() {
    Logger.debug('LocalStorage.clear()');
    return this.storage.clearStore();
  }
}
