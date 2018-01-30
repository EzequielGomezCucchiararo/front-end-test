(() => {
  // ::: Libraries ::: 
  const Rx = require('rxjs');

  // ::: Services ::: 
  const handlersService = require('./services/handlers.service')
  const elementsService = require('./services/elements.service')
  const favouriteService = require('./services/favourites.service');

  // ::: DOM Element references ::: 
  const DOMSearchBtn = document.getElementById("searchBtn");
  const DOMSearchInput = document.getElementById("searchInput");
  const DOMResultsList = document.getElementById("resultsList");
  const DOMTypeSelect = document.getElementById("typeSelect");
  const DOMFavList = document.getElementById("favList"); 
  const DOMItemsSelected = document.getElementById("itemsSelected");
  const DOMDeleteSelected = document.getElementById("deleteSelected");

  // Get list of favourites
  const favourites = favouriteService.getFavourites();

  // Array that keep favourites selected items; init empty.
  const selected = [];

  // Variable that holds type selected for search (series/actors); init default value: series.
  let typeSelected = DOMTypeSelect.value;

  // Print list of favourites
  elementsService.buildResults(DOMFavList, favourites, true);

  // ::: Observables from DOM Events :::

  // Delete selected BUTTON
  const onDeleteSelected$ = Rx.Observable
    .fromEvent(DOMDeleteSelected, "click");

  // Type search SELECT
  const typeSelect$ = Rx.Observable
    .fromEvent(DOMTypeSelect, 'change')
    .subscribe(e => { typeSelected = e.target.value });

  // Search BUTTON
  const searchBtn$ = Rx.Observable
    .fromEvent(DOMSearchBtn, "click")
    .map(event => {
      event.preventDefault();
      return DOMSearchInput.value;
    })
    // Avoid multiple request during 250ms
    .debounceTime(250)
    // switchMap operator basicly help us to manage async operations discarting the first Observable and take the new one (Promise)
    .switchMap(searchValue => handlersService.getHandler(typeSelected, searchValue))

  // ::: Subscriptions to Observable Streams :::
  // When we get the response from the API: show the results
  const searchBtnSubscription = searchBtn$.subscribe(response => {
    elementsService.buildResults(DOMResultsList, response);
  });

  // Add a favourite when Save Button is clicked
  const favouritesSubscription = favouriteService.onSaveSubject$
    .subscribe(element => {
      DOMFavList.appendChild(elementsService.buildResult(element, true));
    });

  // Select favourite element when is clicked
  const favouriteSelectedSubscription = favouriteService.onSelectSubject$
    .subscribe(id => { refreshSelectSection(id); });

  // Delete a favourite when Delete Button is clicked
  const onDeleteSelectedSubscription = onDeleteSelected$
    .subscribe(onDeleteSelectedHandler);

  // Refresh styles when select and unselect favourites
  function refreshSelectSection(id) {
    let index = selected.findIndex(e => e === id);
    index === -1 ? selected.push(id) : selected.splice(index, 1);
    DOMItemsSelected.childNodes[0].innerText = selected.length;
    DOMItemsSelected.style.visibility = selected.length ? 'visible' : 'hidden';
    DOMDeleteSelected.style.visibility = selected.length ? 'visible' : 'hidden';
  }

  // Delete selected favourites Handler
  function onDeleteSelectedHandler() {
    for (let id of [...selected]) {
      let DOMElement = document.getElementById(id);
      DOMElement.parentNode.removeChild(DOMElement);
      favouriteService.removeFavourite(id);
      refreshSelectSection(id);
    }
  }
})();