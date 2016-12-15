Object.defineProperty(Object.prototype, 'cloneValues', {
  value: function() {
    return JSON.stringify(JSON.parse(this));
  },
  writable: true,
  configurable: true,
  enumerable: false
});