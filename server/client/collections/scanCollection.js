var ScanCollection = Backbone.Collection.extend({
  url: 'http://127.0.0.1:3000/api/scans',
  model: ScanModel,

  addScans: function() {
    $.get(this.url,
        function(scans) {
          for(var i = 0; i < scans.length; i++) {
            this.add({
              scanId: scans[i].scan_id,
              md5: scans[i].md5,
              sha1: scans[i].sha1,
              sha256: scans[i].sha256,
              scanDate: scans[i].scan_date,
              positives: scans[i].positives,
              total: scans[i].total,
              scans: scans[i].scans,
              permalink: scans[i].permalink,
            });
          }
        }.bind(this)
    );
  },

  initialize: function() {
    this.addScans();
  }
});
