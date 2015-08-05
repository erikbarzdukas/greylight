var ScansView = Backbone.View.extend({
  id: 'scans',

  render: function() {
    this.$el.empty();

    var scanViews = _.map(this.collection.models, function(scan) {
      var scanView = new ScanView({model: scan});
      return scanView.$el;
    });

    this.$el.append(scanViews);
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  }
})
