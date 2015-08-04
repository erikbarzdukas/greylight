var FileCollection = Backbone.Collection.extend({
  url: '/api/files',
  model: FileModel,

});
