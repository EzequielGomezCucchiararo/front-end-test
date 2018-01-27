(() => {
  const Rx = require('rxjs');

  const onSaveSubject$ = new Rx.Subject();

  module.exports = {
    onSaveSubject$: onSaveSubject$,
  };


})();