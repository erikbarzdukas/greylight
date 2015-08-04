var FileCollection = Backbone.Collection.extend({
  url: 'http://127.0.0.1:3000/api/files',
  model: FileModel,

  addFiles: function() {
    $.get(this.url,
        function(files) {
          for(var i = 0; i < files.length; i++) {
            this.add({
              filename: files[i].filename,
              digest: files[i].digest,
              location: files[i].location,
              VTreport: files[i].VTreport,
              download: files[i].location.replace('server/uploads/', '')
            });
          }
        }.bind(this)
    );
  },

  initialize: function() {
    this.addFiles();
  }
});
