var AppView = Backbone.View.extend({
  render: function() {
    $('#f').append(this.filesView.$el);
    $('#s').append(this.scansView.$el);
    $('body').append(this.$el);
  },

  initialize: function() {
    this.filesView = new FilesView({collection: this.model.files});
    this.scansView = new ScansView({collection: this.model.scans});
    this.render();
  } 
});
