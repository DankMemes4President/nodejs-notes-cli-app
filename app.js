const yargs = require('yargs')
const notes = require('./notes.js')

// customise yargs version
yargs.version('1.1.0')

// add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string',
      }  
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// remove
yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// list
yargs.command({
    command:'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes()
    }
})

// read
yargs.command({
    command:'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()

// console.log(yargs.argv)
