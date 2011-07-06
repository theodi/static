$(document).ready(function() {

  $.extend( $.ui.autocomplete.prototype, {
    _renderItem: function( ul, item) {
      var list = "<li></li>"
      if (item.clazz) {
        list = "<li class=\""+item.clazz+"\"></li>"
      }
      return $( list )
        .data( "item.autocomplete", item )
        .append( $( "<a></a>" ).html( item.html || item.label ) )
        .appendTo( ul );
    }
  });

  var precooked = null;
  $.ajax({
    url: "/search/precooked",
    dataType: "jsonp",
    jsonpCallback: "precookedf",
    cache: true,
    success: function(data) {
      precooked = data;
    }
  });

  // //setup search hint items
  // $('.search_hint_item').click(
  //     function(item){
  //         $('#main_autocomplete').val($(this).text());
  //     }
  // );

  var search_box_default_text = "I’m looking for…";
  //search hint
  //
  $('#main_autocomplete').val(search_box_default_text);

  $('#main_autocomplete').blur(
    function(){
      if ($('#main_autocomplete').val() == "") {
        $('#main_autocomplete').val(search_box_default_text);
      }
    }
  );

  $('#main_autocomplete').focus(
    function(){
      if ($('#main_autocomplete').val() == search_box_default_text) {
        $('#main_autocomplete').val("");
      }
    }
  );

  var filter_terms = function(search_term,data) {
    var highlight_term = function(string,term) {
      html_safe = html_escape(string);
      var terms = term.split(' ');
      for (var i in terms)  {
        var clean_term = html_escape(terms[i].replace(/^\s+|\s+$/g, ''));
        if (clean_term != "") {
          var regex = new RegExp("\\b("+clean_term+")","ig");
          html_safe = html_safe.replace(regex,'<em>$1</em>');
        }
      }
      return html_safe;
    };

    return $.map(data, function(item) {
      return {
        label: html_escape(item.label),
        html:  highlight_term(item.label,search_term),
        url:   item.url
      };
    });
  };

  var track_search = function(type,label) {
    if (_gaq != undefined) {
      _gaq.push( ['_trackEvent', 'Search', type, label]);
    }
  };

  var html_escape = function( string) {
      return $('<div/>').text(string).html();
  };

  $("#main_autocomplete").parent("form").submit(function() {
    $('li.search-site a').addClass("ui-state-hover");
    $('li.search-site a').css('color', '#000');
    track_search("query", $("#main_autocomplete").val());
    return true;
  });

  $("#main_autocomplete").autocomplete({
    delay: 0,
    source: function( request, response ) {

      var search_site = function(search_term) {
        return {
            label: "Search for "+html_escape(search_term),
            html:  "Search for <em>"+html_escape(search_term)+"</em>",
            url:   "/search?q="+encodeURIComponent(search_term),
            clazz: "search-site"
          };
      };

      var loading = function(term) {
        var data = [];
        if (precooked) {
          if (precooked[term]) {
            data = filter_terms(term,precooked[term]);
          }
        }
        data.push(search_site(request.term));
        response(data);
      };

      var ajax = function() {
        $.ajax({
          url: "/search/autocomplete",
          dataType: "jsonp",
          jsonpCallback: "search_received",
          data: { term: request.term },
          cache: true,
          success: function( data ) {
            var search_term = request.term;
            data = filter_terms(search_term,data.slice(0,10));
            data.push(search_site(search_term));
            response( data );
          }
        });
      };

      term = request.term;
      if (term.length == 0) {
        response([]);
      } else if (term.length == 1) {
        loading(term);
      } else {
        ajax();
      }
    },
    select: function(event, ui) {
      track_search("select",ui.item.label);
      location.href = ui.item.url;
    }
    // open: function(event, ui){
    //    console.debug(event);
    // }
  });
});