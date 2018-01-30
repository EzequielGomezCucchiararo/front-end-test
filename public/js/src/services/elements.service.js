/**
 * Service that hold methods to build dynamically HTMLElements
 */
(() => {
  const favouriteService = require('./favourites.service');

  // Export service
  module.exports = {
    buildResults,
    buildResult
  };

  /**
   * @param {HTMLElement} ulDomElement - ul element to append results
   * @param {Object[]} data - response
   * @param {Boolean} isFavourite - if it is for build favourites list
   */
  function buildResults(ulDomElement, data, isFavourite = false) {
    ulDomElement.innerHTML = '';
      for (let element of data) {
        let li = buildResult(element, isFavourite);
        ulDomElement.appendChild(li);
      }
  };

  /**
   * @param {Object} element Object that cointais an actor or serie information
   * @param {boolean} isFavourite  - if it is for build favourite element
   * @returns {HTMLElement} - li Element
   */
  function buildResult(element, isFavourite) {
    let type = element.show ? 'show' : 'person';
    let id = element[type].id;
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
    let spanButton = document.createElement('span');
    let spanSelected = document.createElement('span');
    let icon = document.createElement('i');

    // divCover
    divCover.className = 'media-left cover';
    figureImg.className = 'image cover__image';
    img.src = element[type].image ? element[type].image.medium : './images/no-image.png';
    img.alt = element[type].name;
    figureImg.appendChild(img);
    divCover.appendChild(figureImg)

    // divContent
    divContent.className = 'media-content';
    strongName.innerHTML = element[type].name;
    smallNetwork.innerHTML = element[type].network ? `(${element[type].network.name})` : ' ';
    pName.appendChild(strongName);
    pName.appendChild(document.createTextNode(' '));
    pName.appendChild(smallNetwork);
    divContent.appendChild(pName);
    addTags(divContent, type === 'show' ? element[type].genres : ['actors']);

    // divRight
    divRight.className = 'media-right';

    // If it is not a favourite add save button
    if (!isFavourite) {
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
      // Add event listener (click) and emit favourite element with the properly Subject
      aButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        if (!favouriteService.isFavourite(id)) {
          favouriteService.addToFavourite(type, element);
          favouriteService.onSaveSubject$.next(element);
        }
        li.parentNode.removeChild(li);
      })
      divRight.appendChild(aButton);
    } else {
      divRight.innerHTML = 
      `<a class="button is-info is-outlined" style="display: none;">
        <span>Selected</span>
        <span class="icon is-small">
          <i class="fa fa-check"></i>
        </span>
      </a>`;
      // Add event listener (click) and emit selected element with the properly Subject
      li.addEventListener('click', event => {
        event.stopPropagation();
        let firstChild = divRight.childNodes[0];
        firstChild.style.display = firstChild.style.display === 'none' ? 'block' : 'none';
        favouriteService.onSelectSubject$.next(id);
      });
    }

    // article
    article.className = 'media';
    article.appendChild(divCover);
    article.appendChild(divContent);
    article.appendChild(divRight);

    // li
    li.id = id;
    li.className = isFavourite ? 'box favorites__item' : 'box';
    li.appendChild(article);

    // Return li HTMLElement
    return li;

    /** Add tags to a HTMLElement
     * @param {HTMLElement} element 
     * @param {String[]} tags 
     */
    function addTags(element, tags) {
      for (let tag of tags) {
        createTag(element, tag);
      }
    };

    /**
     * @param {HTMLElement} element 
     * @param {String} tag 
     */
    function createTag(element, tag) {
      let span = document.createElement('span');
      span.className = 'tag';
      span.innerHTML = tag;
      element.appendChild(span);
      element.appendChild(document.createTextNode(' '));
    };

  }
})();