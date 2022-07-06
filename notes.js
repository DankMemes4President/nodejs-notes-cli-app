const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }

}

const saveNotes = (notes) =>    {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

// remove
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length <= notesToKeep.length) {
        console.log(chalk.inverse.red("No note found!"))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.inverse.green("Note removed!"))
    }
}

// list
const listNotes = () => {
    console.log(chalk.inverse("Your Notes:"))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
           
}

// read 
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.inverse.blue.bold(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note not found"))
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}