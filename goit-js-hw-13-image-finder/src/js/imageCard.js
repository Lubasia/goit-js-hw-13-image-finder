import api from './apiService';
import templates from '../templates/templates.hbs';
import refs from './refs';

refs.searchForm.addEventListener('submit', imageSearch);

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
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && api.query !== '') {
      api.fetchPicture().then(hits => {
        const markup = createListItemsTemplate(hits);
        iserListItems(markup);
        api.incrementPage();
      });
    };
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '300px',
});
observer.observe(refs.container);


      function iserListItems(items) {
        refs.gallery.insertAdjacentHTML('beforeend', items);
      }
      
      function createListItemsTemplate(items) {
        return templates(items);
      }
      
      function clearListItems() {
        refs.gallery.innerHTML = '';
      }

