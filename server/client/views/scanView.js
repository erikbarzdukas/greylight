var ScanView = Backbone.View.extend({
  class: 'scan',

  template: _.template('<p><%=sha256%> <a href="<%=permalink%>" target="_blank">Report</a></p>'),
  
  render: function() {
    if(this.model.attributes.sha256 !== undefined) {
      this.$el.append(this.template(this.model.attributes));
      this.$el.append(JSON.stringify(this.model.attributes.scans));
    }
  },

  initialize: function() {
    this.render();
  }
});
