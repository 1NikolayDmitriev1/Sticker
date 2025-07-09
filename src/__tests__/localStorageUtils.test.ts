import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';

describe('localStorageUtils', () => {
  it('secures and uploads data', () => {
    saveToLocalStorage('testKey', { foo: 'bar' });
    const data = loadFromLocalStorage('testKey');
    expect(data).toEqual({ foo: 'bar' });
  });

  it('returns null if the key does not exist', () => {
    const data = loadFromLocalStorage('no_such_key');
    expect(data).toBeNull();
  });
}); 