var ScanView = Backbone.View.extend({
  class: 'scan',

  template: _.template('<p><%=sha256%> <a href="<%=permalink%>" target="_blank">Report</a> <p><%=scans%></p></p>'),
  
  render: function() {
    this.$el.append(this.template(this.model.attributes));
  },

  initialize: function() {
    this.render();
  }
});
