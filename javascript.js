$(document).ready(function() {

    var movie = ['Mean Girls','Austin Powers','Home Alone'];

    function populateButtons(searchArray, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for(var i = 0; i < searchArray.length; i++) {
            var a = $('<button>');
            a.addClass(classToAdd);
            a.attr('data-type', searchArray[i]);
            a.text(searchArray[i]);
            $(areaToAddTo).append(a);
        }
    }

    $(document).on("click", ".movie-button", function() {
        $("#searches").empty();
        $(".movie-button").removeClass("activate");
        $(this).addClass("activate");
        

        var type = $(this).data("type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=ygVAsVC3wYsod0RtS9GcxtWXKyFRJuO3&limit=10";

        $.ajax({url: queryURL,method: "GET"})
            .done(function(response){
                var results = response.data;
                

                for (var i = 0; i < results.length; i++) {
                    var movieDiv = $("<div class=\"movie-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var movieImage = $("<img>");
                    movieImage.attr("src", still);
                    movieImage.attr("data-still", still);
                    movieImage.attr("data-animate", animated);
                    movieImage.attr("data-state", "still");
                    movieImage.addClass("searchImage");

                    movieDiv.append(p);
                    movieDiv.append(movieImage);

                    $("#searches").append(movieDiv);
                }
            });
    });

    $(document).on("click", "searchImage", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var newMovie = $("input").eq(0).val();

        if (newMovie.length > 2) {
            movie.push(newMovie);
        }

        populateButtons(movie, "movie-button", "#movie-buttons");

    });

    populateButtons(movie, "movie-button", "#movie-buttons");

});




