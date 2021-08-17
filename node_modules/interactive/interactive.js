var util = require('util');
var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;



//COMMAND VARIABLES
var command_memory = [];
var tmp = "";
var index = 0;
var pos = 0;
var display = "";
var exit = false;
var indentation = 0;
var saved = "";

var isAbsolute = function (path) {
    return path.substr(0,2) == '\\' || path.substr(1,2) == ':\\' || path.substr(0,1) == '/';
};

var refreshLine = function () {
    display = display.replace(/[\x00-\x1F\x7F-\x9F]/, "", "g");
    var offset = display.length-pos+1;
    stdout.write('\u001b[2K\r');
    if(indentation === 0) {
        stdout.write('> ');
    }
    for(var i = 0; i < indentation; i++) {
        stdout.write('... ');
    }
    stdout.write(display + ' \u001b['+offset+'D');
    if(index == command_memory.length) {
        tmp = display;
    }
    exit = false;
};

var countIndentation = function (line) {
    var len = line.length;
    for(var i = 0; i < len; i++) {
        if(line[i] == '{') {
            indentation++;
        } else if(line[i] == '}') {
            indentation--;
        }
    }
};

var clearLine = function () {
    pos = 0;
    tmp = "";
    display = "";
    refreshLine();
};

var execute = function (code) {
    try {
        stdout.write('\n');
        result = eval.apply(global, [code]);
        stdout.write('\u001b[37m' + util.inspect(result) + '\u001b[0m');
    } catch (e) {
        stdout.write(e.toString() + e.stack);
    }
    stdout.write('\n');
};

var processKey = function( key ){
    switch (key) {
        /*---------------------------------------------/
        /--------------------CTRL+C--------------------/
        /---------------------------------------------*/
        case '\u0003':
            if(!exit) {
                stdout.write('\n(^C again to quit)\n> ');
                exit = true;
            } else {
                stdout.write('\n');
                module.exports.stop(true);
            }
            break;
        /*---------------------------------------------/
        /--------------------CTRL+L--------------------/
        /---------------------------------------------*/
        case '\u000c':
            stdout.write('\u001b[2J\u001b[H');
            refreshLine();
            break;
        /*---------------------------------------------/
        /--------------------ENTER---------------------/
        /---------------------------------------------*/
        case '\u000d':
            var result;
            
            countIndentation(display);
            
            if(display == ':q') {
                stdout.write('\n');
                module.exports.stop();
                break;
            }
            
            if(display.substr(0,2) == ':l') {
                var path = display.substr(3);
                if(!isAbsolute(path)) {
                    path = process.cwd() + '/' + display.substr(3);
                }
                fs.exists(path, function(exists) {
                    if(exists) {
                        fs.readFile(path, { encoding: 'utf8' }, function(err, data) {
                            if(err) {
                                stdout.write("\nCouldn't load snippet\n");
                                clearLine();
                            } else {
                                command_memory.push(display);
                                index = command_memory.length;
                                execute(data);
                                clearLine();
                            }
                        });
                    } else {
                        stdout.write("\nFile doesn't exist!\n");
                        clearLine();
                    }
                });
                break;
            }
            
            if(display.length === 0) {
                if(saved.length === 0) {
                    stdout.write('\n\u001b[37mundefined\u001b[0m\n');
                }
                clearLine();
                break;
            }
            
            saved += display;
            command_memory.push(display);
            
            if(indentation === 0) {
                execute(saved);
                saved = "";
            }
            
            
            while(command_memory.length > 100) {
                command_memory.shift();
            }
            index = command_memory.length;
            clearLine();
            break;
        /*---------------------------------------------/
        /-------------------BACKSPACE------------------/
        /---------------------------------------------*/
        case '\u007F':
            if(pos > 0) {
                display = display.substr(0, pos-1) + display.substr(pos);
                pos--;
                refreshLine();
            }
            break;
        /*---------------------------------------------/
        /-------------------UP ARROW-------------------/
        /---------------------------------------------*/
        case '\u001b[A':
            if(command_memory[index-1]) {
                index--;
                display = command_memory[index];
                pos = display.length;
                refreshLine();
            }
            break;
        /*---------------------------------------------/
        /------------------DOWN ARROW------------------/
        /---------------------------------------------*/
        case '\u001b[B':
            if(command_memory[index+1]) {
                index++;
                display = command_memory[index];
                pos = display.length;
                refreshLine();
            } else {
                index = command_memory.length;
                pos = tmp.length;
                display = tmp;
                refreshLine();
            }
            break;
        /*---------------------------------------------/
        /------------------LEFT ARROW------------------/
        /---------------------------------------------*/
        case '\u001b[D':
            if(pos > 0) {
                stdout.write('\u001b[1D');
                pos--;
            }
            break;
        /*---------------------------------------------/
        /-----------------RIGHT ARROW------------------/
        /---------------------------------------------*/
        case '\u001b[C':
            if (pos < display.length) {
                stdout.write('\u001b[1C');
                pos++;
            }
            break;
        /*---------------------------------------------/
        /---------------------HOME---------------------/
        /---------------------------------------------*/
        case '\u001bOH':
            pos = 0;
            refreshLine();
            break;
        /*---------------------------------------------/
        /---------------------END----------------------/
        /---------------------------------------------*/
        case '\u001bOF':
            pos = display.length;
            refreshLine();
            break;
        /*---------------------------------------------/
        /-------------------ALL KEYS-------------------/
        /---------------------------------------------*/
        default:
            if(pos == display.length) {
                display += key;
                pos = display.length;
            } else if (pos < display.length) {
                display = display.substr(0, pos) + key + display.substr(pos);
                pos++;
            }
            refreshLine();
    }
};

/*---------------------------------------------/
/--------------------START---------------------/
/---------------------------------------------*/
module.exports.start = function (name) {
    fs.readFile(__dirname + '/history.json', { encoding:"utf8" }, function(err, data) {
        if(err) {
            stdout.write("Couldn't load command history!\n");
            command_memory = [];
            index = 0;
        } else {
            try {
            command_memory = JSON.parse(data);
            } catch (e) {
                stdout.write("Couldn't load command history!\n");
            }
            index = command_memory.length;
        }
        if(name) {
            stdout.write('Interactive mode started at: ' + name + '\n');
        }
        stdin.setRawMode(true);
        stdin.setEncoding('utf8');
        stdout.setEncoding('utf8');
        stdin.resume();
        stdin.on('data', processKey);
        tmp = "";
        pos = 0;
        display = "";
        exit = false;
        indentation = 0;
        saved = "";
        refreshLine();
    });
    
};

module.exports.stop = function (quit) {
    fs.writeFile(__dirname + '/history.json', JSON.stringify(command_memory), function(err) {
        if(err) {
            stdout.write("Couldn't save history!");
        }
        if(quit) {
            process.exit();
        }
    });
    stdout.write('\u001b[37m' + 'Interactive mode off\n' + '\u001b[0m');
    stdin.removeListener('data', processKey);
    stdin.setRawMode(false);
};