const inquirer = require('inquirer');
// const liri = require('./liri.js')

let quest = [{
    type: 'confirm',
    message: 'Is that you Joaquin?',
    name: 'grader1',
    default: true
}, {
    type: 'confirm',
    message: 'Oh is it Tatiana?',
    name: 'grader2',
    default: true
}, {
    type: 'confirm',
    message: 'Ok, Peleke, Right?!',
    name: 'grader3',
    default: true
}, {
    type: 'input',
    message: 'Oye!, Who is this then?',
    name: 'grader4',
    validate: validateName
}];

//-- validates input value for empty and make a request for input --
function validateName(name) {
    if (name == '') {
        console.log('No, Really give me a name')
    }
    return name !== '';
}

//-- prompts user for their name --
inquirer.prompt(quest[0]).then(function(answers) {

    if (answers.grader1) {
        appStart('Joaquin');

    } else if (!answers.grader1) {

        inquirer.prompt(quest[1]).then(function(answers) {
            if (answers.grader2) {
                appStart('Tatiana');

            } else if (!answers.grader2) {

                inquirer.prompt(quest[2]).then(function(answers) {
                    if (answers.grader3) {
                        appStart('Peleke');

                    } else {
                        inquirer.prompt(quest[3]).then(function(answers) {
                            appStart(answers.grader4);
                        });
                    }
                });
            }
        });
    }
});

//-- prompts user for function choice tweets or movie --
function appStart(graderName) {

    let choice = [{
        type: 'input',
        name: 'userChoice',
        message: 'Hey ' + graderName + ' sup?, I want to show you somthing. Enter the word "tweets" or the word "movie" to research movie stats of your choice:',
        validate: validateName
    }, {
        type: 'input',
        name: 'movieTitle',
        message: graderName + ', you ask me to look up a movie, what is the tile you want me to search:',
        validate: validateName
    }];
    //-- prompts user for movie titleclear --
    inquirer.prompt(choice[0]).then(function(answers) {
    	console.log('movie or tweets: ', answers.userChoice);
    	if (answers.userChoice == 'movie') {
            inquirer.prompt(choice[1]).then(function(answers) {
                let userChoice = 'movie';
                exports.choice = ['graderName', 'userChoice', 'answers.movieTitle'];

            });
        } else {
            exports.choice = ['graderName', 'answers.userChoice'];
        }
        
    });
}
    // generall catch all prompt function
    // function userPrompt(choice, answers) {
    //     inquirer.prompt(choice).then(function(answers) {
    //         console.log('in prompt function');

    //     });



    // inquirer.prompt(initQuestion, greeting);
    // if (answers.grader1) {
    // 	console.log('Yo Joaquin') 
    // } else {
    // 	// call next question
    // }
