// Asynchronous Flickr Search

$(document).on('ready', function(){
  console.log('b');

  //create a function called `searchImages()`. Accept a string value called `tags` as an argument.
  var searchImages = function(tags) {
    //Define the location of the Flickr API.
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    console.log('starting search img function: '+tags );
    $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
    //Construct a `$.getJSON()` call where you send a request object including the tags the user submitted
    $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"
      //a `done()` handler that displays and refreshes the content appropriately.
    }).done(function( data ) {
      //empties image area first
      $('#images').empty();
      //Update the display to add the images to the list with the id `#images`.
      $('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
      $.each( data.items, function( i, item ) {
        var newListItem = $("<li>")
        // If you're not doing the modal, then show info about the image.
        var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
        var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);
      });
    });
  };
  // Attach an event to the search button (`button.search`) to execute the search when clicked.
  $('button.search').on('click', function(event){
    event.preventDefault();
    // Get the value of the 'input[name="searchText"]' and use that as the `tags` value you send to `searchImages()`.
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);
    //Execute the `searchImages()` function to fetch images for the user.
    searchImages(searchTextInput.value);
  });

});
