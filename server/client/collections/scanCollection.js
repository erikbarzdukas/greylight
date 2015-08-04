var ScanCollection = Backbone.Collection.extend({
  url: '/api/scans',
  model: ScanModel,
});
