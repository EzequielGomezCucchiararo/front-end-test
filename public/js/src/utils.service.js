(() => {
  const Rx = require('rxjs');
  const elementsService = require('./elements.service');

  const baseUrl = {
    series: 'http://api.tvmaze.com/search/shows?q=',
    actors: 'http://api.tvmaze.com/search/people?q='
  }

  module.exports = {
    getHandler,
    buildResults,
  };

  function buildResults(type, ulDomElement, data, isFavourite = false) {
    ulDomElement.innerHTML = '';
      for (let element of data) {
        let li = elementsService.buildResult(type, element, isFavourite);
        ulDomElement.appendChild(li);
      }
  };

  function getHandler(type, query) {
    let parsedQuery = encodeURI(query);
    let url = baseUrl[type] + parsedQuery;
    let stream = fetch(url)
      .then(response => response.json())
      .catch(error => Rx.Observable.empty());
    return (Rx.Observable.fromPromise(stream));
  };

})();