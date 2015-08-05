var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.files = new FileCollection();
    this.scans = new ScanCollection();
  }
});
