var ScanView = Backbone.View.extend({
  class: 'scan',

  template: _.template('<p><%=sha256%> <a href="<%=permalink%>" target="_blank">Report</a></p>'),
  scansTemplate: _.template('<p><ul><li><b>Antivirus: </b><%=av%></li> <li><b>Detected:</b> <%=detected%> </li><li><b>Filename:</b> <%=result%></li></ul></p>'),

  render: function() {
    if(this.model.attributes.sha256 !== undefined) {
      this.$el.append(this.template(this.model.attributes));
      for(var key in this.model.attributes.scans) {
        this.$el.append(this.scansTemplate({
          av: key,
          detected: this.model.attributes.scans[key]["detected"],
          result: this.model.attributes.scans[key]["result"],
        }));
      }
    }
  },

  initialize: function() {
    this.render();
  }
});
