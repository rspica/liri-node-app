const keys = require("./keys.js")
const fs = require('fs')
const twitter = require("twitter")
const spotify = require("spotify")
const request = require("request")

const command = process.argv[2]
let movieEntered = process.argv[3]
let movieStringArray = process.argv.slice(3)
let movieTitle = movieStringArray.join('+')

// const tweetLog = tweetLog.txt
// const randomAct = random.txt

// const randomAct = random.txt

// function tweetLog(tweet) {
//  tweet.split(', ')
//     fs.appendFile(tweetLog, "posted Tweet time: " + tweets[i].created_at + "The tweet: " + tweets[i].text, function callBackAppend(error) {
//         if (error) {
//             console.error(new Error('Whoops, something bad happened'))
//         } else { console.log('tweet' + [i] + ' logged') }
//     })
// }
function errorHandle(err) {
    console.error('Something bad happened: ', err);
}

function writeResults(command, results) {
    let data = JSON.stringify(results, null, 4)
    fs.appendFile('inputResults.txt', data, function finished(err) {
        if (err) {
            errorHandle(err);
        }
        console.log('Data logged successfully')
    });
}




/**
 * appendData creates an object that logs every interaction the user has with liri.js.
 * 
 * Example Usage: `appendData('movie-this', movieResponse)`
 *
 * @param action    The action that the user took. Provided in process.argv[2].
 * @param data       The data liri.js retrieved in response to the user's action.
 */
// function appendData(action, data) {

//     [
//   {
//     action: 'movie', 
//     data: <movie data>
//   },
//   {
//     action: 'tweets',
//     data: [
//       {
//         <tweet object>
//       }
//     ]
//   },
//   ...
// ]

//     // 1. Create a new {action:..., data:...} object

//     // 2. Read the log.txt file as a string :: What function do you need here?
//         // 3. If the file contents are empty, create a new array to push the object to
//         // 4. Otherwise, parse the fileContents as JSON, and use this as your array

//         // 5. Push the new object to the array from Step 3/4

//         // 6. Save this as the new log.txt file :: What function do you need here?

//     })
// }



//----------------------------------------------
//--- Twitter request up to 20 latest tweets ---
//----------------------------------------------

if (command === 'tweets') {
    const client = new twitter(keys.twitterKeys)
    var params = {
        screen_name: 'Michael28118250',
        count: 20
    }

    client.get('statuses/user_timeline', params, function(err, tweets, response) {

        for (var i = 0; i < tweets.length; i++) {
            console.log("____________________________________________")
            console.log("tweet time: " + tweets[i].created_at + '\n')
            console.log("captured tweet: \n" + tweets[i].text + '\n')
            writeResults(command, tweets[i].text);
            if (err) {
                errorHandle(err);
            }
        }
    });

    //----------------------------------------------
    //------------ Movie data request --------------
    //----------------------------------------------


} else if (command === 'movie') {
    if (movieTitle === null) {
        movieTitle = 'Mr. Nobody'
    } else {
        var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movieTitle;
        request(queryUrl, function(err, response, body) {
            if (err) {
                errorHandle(err);

            } else if (!err && response.statusCode == 200) { // If the request is successful
                var results = JSON.parse(body);
                console.log("results: ", results);
                console.log("Movie selected: ", results.Title + '\n');
                console.log("Can you believe " + results.Title + " made: " + results.BoxOffice + '\n'); // Logs the $ amout the movie made
                console.log(results.Title + " was released on: " + results.Released + '\n'); // Logs the Release Year for the movie
                console.log("The IMDB Rating for " + results.Title + " is: " + results.imdbRating + '\n'); // Logs the IMDB Rating of the movie.
                console.log("The country " + results.Title + " was released: " + results.Country + '\n'); // Logs the Country where the movie was produced
                console.log("The language of " + results.Title + " is: " + results.Language + '\n'); // Logs the Language of the movie
                console.log(results.Title + " the plot is: " + results.Plot + '\n'); // Logs the Plot for the movie
                console.log(results.Actors + " were the actors in " + results.Title + '\n'); // Logs the Actors in the movie
                let movieTomatoName = movieStringArray.join('%20');
                console.log("Check out more about " + movieEntered + " https://www.rottentomatoes.com/search/?search=" + movieTomatoName + '\n'); // Logs the Rotten Tomatoes URL
                writeResults(command, results);
            }
        })
    }
}
//----------------------------------------------
//------------ data info write -----------------
//----------------------------------------------

//     fs.appendFile(movieLog, "Movie Title: " + response.Title + " The year " + response.Title + " came out: " + response.Year + "IMDB rating for " + response.Title + " " + Response.imdbRating + " Country of Origin for " + response.Title + ": " + response.Country + "Language of " + response.Title + ": " + response.Language + " " + response.Title + " Movie plot: " + response.Plot + "Movie Actors: " + response.Actors + "Rotten Tomatos Rating: " + response.+ Ratings[2].value, function callBackAppend(error) {
//         if (error) {
//             console.error(new Error('Whoops, something bad happened'))
//         } else { console.log('tweet' + [i] + ' logged') }
//     })

//----------------------------------------------
//-------- Spotify request not required --------
//----------------------------------------------

// } else if (command === 'spotify-this-song') {
//     console.log('spotify-this-song')

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from

//    * if no song is provided then your program will default to
//      * "The Sign" by Ace of Base

//------------------------------------------------------------
//--- Spotify request fron a random data.txt file, not req ---
//------------------------------------------------------------

// } else if (command === 'do-what-it-says') {
//     console.log('do-what-it-says')

//  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Feel free to change the text in that document to test out the feature for other commands.





// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

// - - -

// ### One More Thing

// If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.
