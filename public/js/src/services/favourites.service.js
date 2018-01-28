(() => {
  const Rx = require('rxjs');

  const onSaveSubject$ = new Rx.Subject();
  const onSelectSubject$ = new Rx.Subject();

  module.exports = {
    onSaveSubject$: onSaveSubject$,
    onSelectSubject$: onSelectSubject$,
    addToFavourite,
    removeFavourite,
    getFavourites,
    isFavourite
  };

  function addToFavourite(type, element) {
    let id = element[type].id;
    localStorage.setItem(id, JSON.stringify(element));
  }

  function isFavourite(id) {
    return !!localStorage.hasOwnProperty(id);
  }

  function removeFavourite(id) {
    localStorage.removeItem(id);
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