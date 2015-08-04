var FileView = Backbone.View.extend({
  class: 'file',

  template: _.template('<p><%=filename%> <%=digest%> <a href="http://127.0.0.1:3000/<%=download%>">Download</a><p>'),
  render: function() {
    this.$el.append(this.template(this.model.attributes));
  },

  initialize: function() {
    this.render();
  }


});
