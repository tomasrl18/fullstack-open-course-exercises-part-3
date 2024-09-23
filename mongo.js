const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please, define more arguments')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tomasrl18:${password}@cluster0.krk9q.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find().then(result => {
        if (result.length === 0) {
            console.log('The phonebook is empty');
            process.exit(1)
        }

        console.log('Phonebook:\n');

        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
    
        mongoose.connection.close()
    })
}

if (process.argv.length > 3 && process.argv.length < 5) {
    console.log('Please, define a name and a number')
    process.exit(1)
}

if (process.argv.length === 5) {
    const person_name = process.argv[3]
    const person_number = process.argv[4]

    const person = new Person({
        name: person_name,
        number: person_number
    })

    person.save().then(result => {
        console.log(`Added ${person_name} number ${person_number} to phonebook`)
        mongoose.connection.close()
    })
}