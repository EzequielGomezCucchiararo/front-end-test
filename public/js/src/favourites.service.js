(() => {
  const Rx = require('rxjs');

  const onSaveSubject$ = new Rx.Subject();
  const onSelectSubject$ = new Rx.Subject();

  module.exports = {
    onSaveSubject$: onSaveSubject$,
    onSelectSubject$: onSelectSubject$
  };

})();