import { question } from "readline-sync"
import { readFile, writeFile, appendFile } from 'node:fs/promises'

// console.log('Welcome user!')
// let name = question('what is your name?: ')

// console.log(`Welcome again, ${name}!`)

// let randomNumber = Math.floor(Math.random() * 100) + 1;
// let correctGuess = false;
// let numberOfGuesses = 0

// while (!correctGuess) {
//   let guess = question('Guess a number between 1 and 100: ');
//   if (guess < randomNumber) {
//     console.log('The secret number is greater than your guess');
//     numberOfGuesses++
//   } else if (guess > randomNumber) {
//     console.log('The secret number is less than your guess');
//     numberOfGuesses++
//   } else {
//     numberOfGuesses++
//     console.log(`Your guess is correct! You guessed right in ${numberOfGuesses} guesses! `);
//     correctGuess = true;


//   }
// }

// let contents =  String(await appendFile('guestbook.txt', question('Enter a name: ')))

// console.log('Innheåll')
// console.log(contents)

/// göra ett bibliotek 
const file = 'books.json'

// book object: {title, author, genre}
console.log('*** Welcome to the library ***')
console.log('What do you want to do')

console.log('1. View the catalog')
console.log('2. Add a book')
console.log('0. Exit \n')


console.log('')

let input = question('Pick an option')

if( input === '1' ) {
    // console.log('Picked 1')
    // Läs in hela bok-filen
    // Konvertera till js objekt med json
    // Visa informationen för användaren 

    let books = await loadBooks(file)

    console.log(`There are ${books.lenght} books in the library: `)
    console.log('debug: ', books)
    books.forEach(book => {
        console.log(`-${book.title} by ${book.author} `)
    })
    console.log('')
} else if( input === '2' ) {
    let title = question('Please input title: ')
    let author = question('Please input author: ')
    let newBook = { title,  author }

    // läs in hela filen
    //omvandla till js array
    // pusha nya boken 
    // omvandla till json sträng 
    //spara strängen 
    let books = await loadBooks(file)
    books.push(newBook)
    saveBooks(file, books)
}

async function loadBooks(filename) {

    try {
    let fileBuffer = await readFile(filename)
    let contents = fileBuffer.toString()
    return JSON.parse(contents)
    } catch (error) {
        console.log('Error: ' + error.message)
        return []
    }
}

async function saveBooks(filename, books) {
    let json = JSON.stringify(books)
    await writeFile(filename, json)
}