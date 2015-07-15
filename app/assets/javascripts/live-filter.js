$(document).ready(function(){

  $("#team-filter").change(function() {
    // Retrieve the filter value and reset the count to zero
    var filter_string = $(this).val();
    var target = $("#grid-people .home-module");
    if (filter_string === "-ALL-TEAMS-") {
      target.show();
    } else {
      // Select items to hide with a filter
      var outGroup = target.filter(function() {
        return $(this).find(".category").attr('data-teams')
          .search(new RegExp('\\b' + filter_string + '\\b')) < 0;
      });
      // Select everything else...
      var inGroup = target.not(outGroup);
      outGroup.hide();
      inGroup.show();
    }
    $("#grid-people").masonry({
      itemSelector: '.home-module',
      columnWidth: '.grid-sizer'
    }).masonry();
    window.dispatchEvent(new Event('scroll'));
  });

});
