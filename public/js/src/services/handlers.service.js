/**
 * This service manage the GET request for the API. It returns an object with the getHandler method
 * to make the request. 
 */

(() => {
  const Rx = require('rxjs');
  const elementsService = require('./elements.service');

  const baseUrl = {
    series: 'http://api.tvmaze.com/search/shows?q=',
    actors: 'http://api.tvmaze.com/search/people?q='
  }
  
  // Export service
  module.exports = {
    getHandler
  };

  /**
   * @param {String} type - [series|actors]
   * @param {String} query - Search value
   */
  function getHandler(type, query) {
    let parsedQuery = encodeURI(query);
    let url = baseUrl[type] + parsedQuery;
    let stream = fetch(url)
      .then(response => response.json())
      .catch(error => Rx.Observable.empty()); 
    // We return an Observable from promise that will be handle with the switchMap operator
    return (Rx.Observable.fromPromise(stream));
  };

})();