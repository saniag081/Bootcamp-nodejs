const express = require('express')
const app = express()
// const http = require('http')

// const app = http.createServer((request, response) => {
// 	response.writeHead(200, {'Content-type': 'text/plain'})
// 	response.end('Hello word')
// })

const notes = [
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

})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})