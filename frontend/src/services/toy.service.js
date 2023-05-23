import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';
import { httpService } from './http.service.js';

const STORAGE_KEY = 'toyDB';
const BASE_URL = 'toy/';

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
};

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy);
}
function getById(toyId) {
  return httpService.get(BASE_URL + toyId);
}
function remove(toyId) {
  // return Promise.reject('Not now!')
  return httpService.delete(BASE_URL + toyId);
}
function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy);
  } else {
    // when switching to backend - remove the next line
    return httpService.post(BASE_URL, toy);
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: [],
  };
}

function getDefaultFilter() {
  return { name: '', price: 0 };
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
