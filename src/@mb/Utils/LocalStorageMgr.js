const LocalStorageMgr = {
  set,
  get,
  setObject,
  getObject,
  clear,
  remove
}

var storage = sessionStorage;

function set(key, value) {
  storage[key] = value;
  return storage[key];
}
function get(key, defaultValue) {
  return storage[key] || defaultValue;
}
function setObject(key, value) {
  storage[key] = JSON.stringify(value);
  return storage[key];
}

function getObject(key, value) {
  return JSON.parse(storage[key] || '{}');
}

function clear() {
  return storage.clear();
}

function remove(key) {
  return storage.removeItem(key);
}

export default LocalStorageMgr;