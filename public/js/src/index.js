const Rx = require('rxjs');

const htmlSearchBtn = document.getElementById("searchBtn");
const htmlSearchInput = document.getElementById("searchInput");
const htmlResultsList = document.getElementById("resultsList");

const searchBtn$ = Rx.Observable
  .fromEvent(htmlSearchBtn, "click")
  .map(event => {
    event.preventDefault();
    return htmlSearchInput.value;
  })
  .flatMap(searchValue => getSeries(encodeURI(searchValue)));

searchBtn$.subscribe(response => {
    htmlResultsList.innerHTML = '';
    for (let element of response) {
      let li = searchResultElement(element);
      htmlResultsList.appendChild(li);
    }
  });

function getSeries(value) {
  let stream = fetch(`http://api.tvmaze.com/search/shows?q=${value}`)
    .then(response => response.json())
    .catch(error => Rx.Observable.empty());
  return (Rx.Observable.fromPromise(stream));
}

function searchResultElement(element) {
  let li = document.createElement('li');
  let article = document.createElement('article');
  let divCover = document.createElement('div');
  let divContent = document.createElement('div');
  let divRight = document.createElement('div');
  let figureImg = document.createElement('figure');
  let img = document.createElement('img');
  let pName = document.createElement('p');
  let strongName = document.createElement('strong');
  let smallNetwork = document.createElement('small');
  let aButton = document.createElement('a');
  let spanSave = document.createElement('span');
  let spanIcon = document.createElement('span');
  let icon = document.createElement('i');

  // divCover
  divCover.className = 'media-left cover';
  figureImg.className = 'image cover__image';
  img.src = element.show.image ? element.show.image.medium : './images/no-image.png';
  img.alt = element.show.name;
  figureImg.appendChild(img);
  divCover.appendChild(figureImg)

  // divContent
  divContent.className = 'media-content';
  strongName.innerHTML = element.show.name;
  smallNetwork.innerHTML = element.show.network ? `(${element.show.network.name})` : ' ';
  pName.appendChild(strongName);
  pName.appendChild(document.createTextNode(' '));
  pName.appendChild(smallNetwork);
  divContent.appendChild(pName);
  addGenres(divContent, element.show.genres);

  // divRight
  divRight.className = 'media-right';
  aButton.className = 'button is-success is-outlined';
  spanSave.innerHTML = 'Save';
  spanIcon.className = 'icon is-small';
  icon.className = 'fa fa-heart';
  spanIcon.appendChild(icon);
  aButton.appendChild(spanSave);
  aButton.appendChild(spanIcon);
  spanIcon.appendChild(icon);
  aButton.appendChild(spanSave);
  aButton.appendChild(spanIcon);
  divRight.appendChild(aButton);

  // article
  article.className = 'media';
  article.appendChild(divCover);
  article.appendChild(divContent);
  article.appendChild(divRight);

  // li
  li.id = element.show.id;
  li.className = 'box';
  li.appendChild(article);

  return li;

  /**
   * @param {*} element 
   * @param {*} genres 
   */
  function addGenres(element, genres) {
    for (let genre of genres) {
      let span = document.createElement('span');
      span.className = 'tag';
      span.innerHTML = genre;
      element.appendChild(span);
      element.appendChild(document.createTextNode(' '));
    }
  }

}
