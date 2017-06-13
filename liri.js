const keys = require("./keys.js")
const fs = require('fs')
const twitter = require("twitter")
const spotify = require("spotify")
const request = require("request")

const command = process.argv[2]

// const randomAct = random.txt

function tweetLog(tweet) {
// 	tweet.split(', ')
//     fs.appendFile(tweetLog, "posted Tweet time: " + tweets[i].created_at + "The tweet: " + tweets[i].text, function callBackAppend(error) {
//         if (error) {
//             console.error(new Error('Whoops, something bad happened'))
//         } else { console.log('tweet' + [i] + ' logged') }
//     })
// }

if (command === 'my-tweets') {
    const client = new twitter(keys.twitterKeys)
    let tweetLog = 'tweetLog.txt'
    let params = {
        screen_name: 'Michael28118250',
        count: 20
    }

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        for (var i = 0; i < tweets.length; i++) {

            console.log("captured tweets: " + tweets[i].text)
            if (error) {
                console.error('twitter error')
            }
            // let tweets2Log = (tweets[i].text + ', ')
            // tweetLog(tweets2Log)
        }
    });


} else if (command === 'spotify-this-song') {
    console.log('spotify-this-song')
        // 2. `node liri.js spotify-this-song '<song name here>'`

    //    * This will show the following information about the song in your terminal/bash window
    //      * Artist(s)
    //      * The song's name
    //      * A preview link of the song from Spotify
    //      * The album that the song is from

    //    * if no song is provided then your program will default to
    //      * "The Sign" by Ace of Base

} else if (command === 'movie-this') {
	request('http://www.omdbapi.com', function (error, response, body) {
  
  	console.log('error:', error); // Print the error if one occurred 
  	console.log('statusCode:', response && response.statusCode); 
 	console.log('body:', body);  
});


        //    * This will output the following information to your terminal/bash window:

    //      ```   http://www.omdbapi.com
    //        * Title of the movie.
    //        * Year the movie came out.
    //        * IMDB Rating of the movie.
    //        * Country where the movie was produced.
    //        * Language of the movie.
    //        * Plot of the movie.
    //        * Actors in the movie.
    //        * Rotten Tomatoes URL.
    //      ```

    //    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    //      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
    //      * It's on Netflix!

} else if (command === 'do-what-it-says') {
    console.log('do-what-it-says')

    //	* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    //      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    //      * Feel free to change the text in that document to test out the feature for other commands.



    // fs.readFile(randomAct, 'utf8', function callBackRead(err, file contents)) {
    // 	if (err) { 
    // 		return console.log(err)
    // 	}

    // 	console.log(randomAct);
    // }


}



// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

// - - -

// ### One More Thing

// If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.
