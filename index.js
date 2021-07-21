const express = require('express')
const app = express()

app.use(express.json())

// const http = require('http')
// const app = http.createServer((request, response) => {
// 	response.writeHead(200, {'Content-type': 'text/plain'})
// 	response.end('Hello word')
// })

let notes = [
	{
		"id": 1,
		"content": "nota numero 1",
		"date": "2019-05-30T17:30:31.",
		"important": true
	},
	{
		"id": 2,
		"content": "nota numero 2",
		"date": "2019-05-30T17:30:31.",
		"important": true
	},
	{
		"id": 3,
		"content": "nota numero 3",
		"date": "2019-05-30T17:30:31.",
		"important": true
	}
]

app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(note => note.id === id)
	response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter(note => note.id !== id)
	response.status(204).end()
})

app.post('/api/notes', (request, response) => {
	const noteRequest = request.body
	const ids = notes.map((note)=> note.id)
	const maxId = Math.max(...ids)

	if (!noteRequest || !noteRequest.content) {
		return response.status(400).json('note.content is missing')
	}

	const newNote = {
		id: maxId + 1,
		content: noteRequest.content,
		important: typeof noteRequest.important !== 'undefined' ? noteRequest.important : false,
		date: new Date().toISOString()
	}

	notes = [...notes, newNote]

	response.json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})