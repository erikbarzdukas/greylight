var FileView = Backbone.View.extend({
  class: 'file',

  template: _.template('<p><%=filename%> <%=digest%><p>'),
  render: function() {
    console.log(this);
    this.$el.append(this.template(this.model.attributes));
  },

  initialize: function() {
    this.render();
  }


});
