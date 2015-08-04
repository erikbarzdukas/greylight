var AppView = Backbone.View.extend({
  render: function() {
    this.$el.append(this.filesView.$el);
    $('body').append(this.$el);
  },

  initialize: function() {
    this.filesView = new FilesView({collection: this.model.files});
    this.render();
  } 
});
