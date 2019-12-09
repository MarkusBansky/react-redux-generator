import ReactReduxGenerator from "./reactReduxGenerator";
const commander = require('commander');
const package_json = require('../package.json');

const program = new commander.Command();
program.version(package_json.version);
program
    .option('-d, --debug', 'output extra debugging')
    .option('-i, --input <type>', 'a list of paths to api specification files')
    .option('-o, --output <type>', 'path to directory where the files are generated');

program.on('--help', function(){
    console.log('');
    console.log('Examples:');
    console.log('  $ generate-axios-api -i api/example.yaml -i api/example-2.yaml -o src --debug');
    console.log('  $ generate-axios-api -i api/example.yaml -i api/example-2.yaml -o src');
    console.log('  $ generate-axios-api -i api/example.yaml -o src');
    console.log('  $ generate-axios-api');
});

program.parse(process.argv);

const generator = new ReactReduxGenerator(program);
generator.start();