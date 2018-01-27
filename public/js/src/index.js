(() => {
  const Rx = require('rxjs');

  const utilsService = require('./utils.service')
  const elementsService = require('./elements.service')
  const favouriteService = require('./favourites.service');

  const DOMSearchBtn = document.getElementById("searchBtn");
  const DOMSearchInput = document.getElementById("searchInput");
  const DOMResultsList = document.getElementById("resultsList");
  const DOMTypeSelect = document.getElementById("typeSelect");

  let typeSelected = DOMTypeSelect.value;

  const typeSelect$ = Rx.Observable
    .fromEvent(DOMTypeSelect, 'change')
    .subscribe(e => { typeSelected = e.target.value });

  const searchBtn$ = Rx.Observable
    .fromEvent(DOMSearchBtn, "click")
    .map(event => {
      event.preventDefault();
      return DOMSearchInput.value;
    })
    .debounceTime(250)
    .switchMap(searchValue => utilsService.getHandler(typeSelected, searchValue))

  const searchBtnSubscription = searchBtn$.subscribe(response => {
    console.warn(response);
    utilsService.buildResults(typeSelected, DOMResultsList, response);
  });

  const favouritesSubscription = favouriteService.onSaveSubject$
    .subscribe(id => {
      console.warn(id);
    })

})();