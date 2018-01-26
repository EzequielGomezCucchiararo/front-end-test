# Softonic Software Engineer Javascript access test

## Exercise

Implement a Web application to manage favorite series and actors.

Users should be able to search a query filtered by type (series or actors). Each result can be saved as a favorite in the list below. Multiple favorites can be selected and removed from the list. When users reload the page, their list of favorites should be preserved.

### API

The search results can be obtained from the following API:

* Endpoint for series: http://api.tvmaze.com/search/shows
* Endpoint for actors: http://api.tvmaze.com/search/people
* Query string parameters:

| Parameter | Required | Valid Options | Description                                      |
| --------- | -------- | ------------- | ------------------------------------------------ |
| q         | Yes      | {string}      | Serie title or actor/actress name to search for. |

* Examples:
  - Get the series that contain "house cards": [http://api.tvmaze.com/search/shows?q=house%20cards](http://api.tvmaze.com/search/shows?q=house%20cards)
  - Get actors that contain "Jennifer Lawrence": [http://api.tvmaze.com/search/people?q=jennifer%20lawrence](http://api.tvmaze.com/search/people?q=jennifer%20lawrence)


## Guidance and restrictions

- The page with the exercise is in `public/index.html`. Try to modify it as little as possible. Do not modify the CSS code.
- Use a modern version of Javascript, if possible.
- Try not to couple your code to a specific framework.
- You can use a build tool if you need it.
- If you want to explain your solution or to add any comment, please do it in `COMMENTS.md`.
- The supported browsers will be latest versions of Chrome, Firefox, Safari, and IE10+.

## Delivery

Please deliver the exercise as a git bundle (e.g.: `git bundle create software-engineer-js-<name>-<surname>.bundle --all`) or in a zip file.
