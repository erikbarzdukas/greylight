var FilesView = Backbone.View.extend({
  id: 'files',

  render: function() {
    this.$el.empty();

    var fileViews = _.map(this.collection.models, function(file) {
      var fileView = new FileView({model: file});
      return fileView.$el;
    });

    this.$el.append(fileViews);
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  }
});
