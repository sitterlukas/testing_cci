#! /usr/bin/env node
import chalk  from "chalk";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import inquirer from 'inquirer';
import fetch from 'node-fetch';

const usage = chalk.hex('#E030F3')("\nUsage: Select options for CCI to start")

const options = yargs(hideBin(process.argv))
    .usage(usage)
    .help(true)
    .argv

console.log(usage)
inquirer
    .prompt([
        {
            name: 'message',
            message: 'Please enter name of the run. Default is "Test run"',
            default: 'Test run'
        },
        {
            type: 'list',
            name: 'name',
            message: 'Who are you? Default is "Random tester"',
            choices: ['Kimbůček', 'Kasička', 'Jožínek', 'Kubíček', 'Lukýno' ],
            default: 'Random tester'
        },
        {
            name: 'branch',
            message: 'Please enter desired branch. Default is main',
            default: 'main'
        },
        {
            type: 'list',
            name: 'type',
            message: 'Select which type of tests you want to use?',
            choices: ['all except percy', 'private', 'public', 'migroman', 'custom glob' ],
        },
        {
            type: 'list',
            name: 'config',
            message: 'Select which config you want to use?',
            choices: ['development.config.js', 'staging.config.js', 'release.config.js' ],
        },
        {
            name: 'glob',
            message: 'Optional. Fill if you want to use some specific glob. Left empty if not',
            default: ''
        },
        {
            name: 'parameters',
            message: 'Optional. Fill if you want to use some specific parameter like grepTags=forman. Left empty if not',
            default: ''
        },
        {
            type: 'list',
            name: 'repetition',
            message: 'Select the repetition option?',
            choices: ['2', '1' ],
        },
        {
            type: 'list',
            name: 'parallelization',
            message: 'Select the parallelization option?',
            choices: ['10', '5', '3', '1' ],
        },

    ])
    .then((answers) => {
        const body = {
            "message": `${answers.message}|${answers.name}|${answers.branch}|${answers.type}|${answers.config}|${answers.glob}|${answers.parameters}|${answers.repetition}|${answers.parallelization}`
        }
        fetch('https://hook.eu1.make.com/k1jhjihji82cf8240qiramyknqah77gm', {
            method: 'POST',
            body: JSON.stringify(body)
        })
        console.log('CCI started successfully')
    })
    .catch((error) => {
        if (error) {
           console.log(error)
        }
    });