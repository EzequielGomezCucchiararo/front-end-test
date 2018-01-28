(() => {
  const Rx = require('rxjs');

  const onSaveSubject$ = new Rx.Subject();
  const onSelectSubject$ = new Rx.Subject();

  module.exports = {
    onSaveSubject$: onSaveSubject$,
    onSelectSubject$: onSelectSubject$,
    addToFavourite,
    removeFavourite,
    selectFavourite,
    getFavourites
  };

  function selectFavourite() {

  }

  function addToFavourite(type, element) {
    localStorage.setItem(element[type].id, JSON.stringify(element));
  }

  function removeFavourite(type, element) {
    localStorage.removeItem(element[type].id);
  }

  function getFavourites() {
    const favourites = [];
    for (let id in localStorage) {
      if (localStorage.hasOwnProperty(id) && !isNaN(id)) {
        let element = JSON.parse(localStorage[id]);
        favourites.push(element);
      }
    }
    return favourites;
  }

})();