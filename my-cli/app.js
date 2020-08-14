var commander = require('commander');
var open = require('open');
var chalk = require('chalk');
var Progress = require('progress'),
    bar = new Progress('running [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: 1
    });

commander
    .arguments('<browser>')
    .option('-u, --url <url>', 'Address of site you want to go to')
    .action(function(browser){
        bar.tick();
        open(commander.url, browser, function (response) {
            if(bar.complete){
                console.log(chalk.yellow('\ncomplete\n'));
            }

            if(response instanceof Error){
                console.log(chalk.red(response.message));
            }
        });
    })
    .parse(process.argv);