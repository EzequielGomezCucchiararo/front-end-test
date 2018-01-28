(() => {
  const Rx = require('rxjs');

  const handlersService = require('./services/handlers.service')
  const elementsService = require('./services/elements.service')
  const favouriteService = require('./services/favourites.service');

  const DOMSearchBtn = document.getElementById("searchBtn");
  const DOMSearchInput = document.getElementById("searchInput");
  const DOMResultsList = document.getElementById("resultsList");
  const DOMTypeSelect = document.getElementById("typeSelect");
  const DOMFavList = document.getElementById("favList");
  const DOMItemsSelected = document.getElementById("itemsSelected");
  const DOMDeleteSelected = document.getElementById("deleteSelected");

  const favourites = favouriteService.getFavourites();
  const selected = [];

  let typeSelected = DOMTypeSelect.value;

  elementsService.buildResults(DOMFavList, favourites, true);

  const onDeleteSelected$ = Rx.Observable
    .fromEvent(DOMDeleteSelected, "click");

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
    .switchMap(searchValue => handlersService.getHandler(typeSelected, searchValue))

  const searchBtnSubscription = searchBtn$.subscribe(response => {
    elementsService.buildResults(DOMResultsList, response);
  });

  const favouritesSubscription = favouriteService.onSaveSubject$
    .subscribe(element => {
      DOMFavList.appendChild(elementsService.buildResult(element, true));
    });

  const favouriteSelectedSubscription = favouriteService.onSelectSubject$
    .subscribe(id => { refreshSelectSection(id); });

  const onDeleteSelectedSubscription = onDeleteSelected$
    .subscribe(onDeleteSelectedHandler);

  function refreshSelectSection(id) {
    let index = selected.findIndex(e => e === id);
    index === -1 ? selected.push(id) : selected.splice(index, 1);
    DOMItemsSelected.childNodes[0].innerText = selected.length;
    DOMItemsSelected.style.visibility = selected.length ? 'visible' : 'hidden';
    DOMDeleteSelected.style.visibility = selected.length ? 'visible' : 'hidden';
  }

  function onDeleteSelectedHandler() {
    for (let id of [...selected]) {
      let DOMElement = document.getElementById(id);
      DOMElement.parentNode.removeChild(DOMElement);
      favouriteService.removeFavourite(id);
      refreshSelectSection(id);
    }
  }
})();