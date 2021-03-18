import api from './apiService';
import templates from '../templates/templates.hbs';
import refs from './refs';

refs.searchForm.addEventListener('submit', imageSearch);
refs.loadMoreBtn.addEventListener('click', loadMoreBtn);

function imageSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.elements.query;

    clearListItems();

  api.resetPage();
  api.searchQuery = input.value;

  api.fetchPicture().then(hits => {
    const markup = createListItemsTemplate(hits);
    iserListItems(markup);
  });
    input.value = '';
}

function loadMoreBtn() {
  api.fetchPicture().then(hits => {
    const markup = createListItemsTemplate(hits);
    iserListItems(markup);
    window.scrollTo(0, 1000);

    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
  });
}

function iserListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function createListItemsTemplate(items) {
  return templates(items);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}