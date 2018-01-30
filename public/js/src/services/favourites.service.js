/**
 * Methods related to favourites operations like select, delete, save...
 */
(() => {
  const Rx = require('rxjs');

  // Subjects that help us to comunicate ections between elements
  // They are basicly an Observable as an Observer
  const onSaveSubject$ = new Rx.Subject();
  const onSelectSubject$ = new Rx.Subject();

  // Export service
  module.exports = {
    onSaveSubject$: onSaveSubject$,
    onSelectSubject$: onSelectSubject$,
    addToFavourite,
    removeFavourite,
    getFavourites,
    isFavourite
  };

  /** Add one result to favourite
   * @param {String} type - [actors|series]
   * @param {HTMLElement} element - HTMLElement
   */
  function addToFavourite(type, element) {
    let id = element[type].id;
    // Save into local storage
    localStorage.setItem(id, JSON.stringify(element));
  }

  /** Check if a result is already a favourite
   * @param {String} id - id from an actor or serie
   */
  function isFavourite(id) {
    return !!localStorage.hasOwnProperty(id);
  }

  /** Remove from local storage a result
   * @param {String} id - id from an actor or serie
   */
  function removeFavourite(id) {
    localStorage.removeItem(id);
  }

  // Return list of favourites storaged
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