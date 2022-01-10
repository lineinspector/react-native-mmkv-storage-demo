import MMKVStorage from 'react-native-mmkv-storage';
// eslint-disable-next-line import/no-cycle
import Logger from '../logger';

export const ENCRYPTED_INSTANCE_ID = 'TestEncryptedV1';

export default class EncryptedLocalStorage {
  constructor(instanceId) {
    this.instanceId = instanceId;
    this.storage = new MMKVStorage.Loader()
      .withServiceName('com.test.app1.TestV1')
      .withInstanceID(this.instanceId)
      .withEncryption()
      .initialize();
  }

  /**
   * Initialize storage
   */
  initialize = async () => {
    Logger.info('EncryptedLocalStorage.initialize()');
  };

  setItem(key, value) {
    Logger.info(`EncryptedLocalStorage.setItem(${key}, ${typeof value})`);
    return this.storage.setStringAsync(key, value);
  }

  async getItem(key) {
    Logger.info(`EncryptedLocalStorage.getItem(${key})`);
    const value = await this.storage.getStringAsync(key);
    Logger.info(`EncryptedLocalStorage.getItem(${key}) - ${typeof value}`);
    // getStringAsync returns undefined if the key is not found, the localStorage interface
    // requires returning a null when the key is missing
    return value === undefined ? null : value;
  }

  removeItem(key) {
    Logger.info(`EncryptedLocalStorage.removeItem(${key})`);
    return this.storage.removeItem(key);
  }

  clear() {
    Logger.info('EncryptedLocalStorage.clear()');
    return this.storage.clearStore();
  }
}
