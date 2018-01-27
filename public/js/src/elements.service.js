(() => {
  const favouriteService = require('./favourites.service');

  module.exports = {
    createSearchResult
  };

  function createSearchResult(type, element) {
    type = type === 'series' ? 'show' : 'person';

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
    aButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      favouriteService.onSaveSubject$.next(element)
      li.parentNode.removeChild(li);
    })
    divRight.appendChild(aButton);

    // article
    article.className = 'media';
    article.appendChild(divCover);
    article.appendChild(divContent);
    article.appendChild(divRight);

    // li
    li.id = element[type].id;
    li.className = 'box';
    li.appendChild(article);

    return li;

    /**
     * @param {*} element 
     * @param {*} genres 
     */
    function addTags(element, tags) {
      for (let tag of tags) {
        createTag(element, tag)
      }
    };

    function createTag(element, tag) {
      let span = document.createElement('span');
      span.className = 'tag';
      span.innerHTML = tag;
      element.appendChild(span);
      element.appendChild(document.createTextNode(' '));
    }

  }
})();