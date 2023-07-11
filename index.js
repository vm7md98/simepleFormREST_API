//Import express library
import express from 'express'

const app = express() //Set app variable as express() method

app.use(express.urlencoded({ extended: true })) //Need! (Line 36)

//Add a list of people in a people array
const people = [
    { name: 'Mohammed' },
    { name: 'Bineid' }
]

app.get('/', (req, res) => {
    const page = `
		<html>
		  <body>
		    <h1>Enter a new person:</h1>
		    <form action="/person" method="POST">
		      <input type="text" name="name" />
		      <input type="submit">
		    </form>
            <h2>List of people:</h2>
            <ul>
            ${people.map(person => `<li>${person.name}</li>`).join('')}
            </ul>
		  </body>

		</html>
  `
  res.send(page)
}) //Use that method to 'request' and 'respond' and the respond will be 'page'

// Inside that structure, we use `Array.map()` to iterate over all the people array items. For each of them, we print a `<li>` item.

// Finally, I call the `.join('')` method to generate a string, otherwise `.map()` returns an array, and we’d see a comma in the resulting HTML because JavaScript tries to “stringify” an array, and adds a comma between elements.

// If you try entering a name and pressing the Submit button now, you’ll see an error saying 'Cannot POST /person'. We need a POST request handler for the /person route.
// Let’s add it:
app.post('/person', (req, res) => {
    console.log('Received a new person data!')

    const name = req.body.name
    people.push({ name: name })
    res.redirect('/')
    // console.log(name)
  })

// If you retry sending the data, you’ll see an error like this:
// “TypeError: Cannot read properties of undefined (reading ‘name’)”

// We’re almost there, but we need to do one more thing before we can get the data sent through the form. We need to tell Express that the data will be URL encoded, using this line:
    // app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => console.log('Server ready')) //Use port 3000 to open the connection/server whatever...

