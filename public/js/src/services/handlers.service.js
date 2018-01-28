(() => {
  const Rx = require('rxjs');
  const elementsService = require('./elements.service');

  const baseUrl = {
    series: 'http://api.tvmaze.com/search/shows?q=',
    actors: 'http://api.tvmaze.com/search/people?q='
  }

  module.exports = {
    getHandler
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