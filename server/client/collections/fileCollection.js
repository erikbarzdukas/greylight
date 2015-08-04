var FileCollection = Backbone.Collection.extend({
  url: '/api/files',
  model: FileModel,

  addFiles: function() {
    $.get(
        '/api/files',
        function(files) {
          for(var i = 0; i < files.length; i++) {
            this.add({
              filename: files[i].filename,
              digest: files[i].digest,
              location: files[i].location,
              VTreport: files[i].VTreport
            });
          }
        }.bind(this);
    );
  },

  intialize: function() {
    this.addFiles()
  }
});
