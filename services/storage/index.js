import EncryptedLocalStorage, { ENCRYPTED_INSTANCE_ID } from './EncryptedLocalStorage';
import DefaultLocalStorage, { INSTANCE_ID } from './DefaultLocalStorage';

export const EncryptedStorage = new EncryptedLocalStorage(ENCRYPTED_INSTANCE_ID);
export const LocalStorage = new DefaultLocalStorage(INSTANCE_ID);

export default LocalStorage;
