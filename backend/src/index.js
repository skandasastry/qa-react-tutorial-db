// import dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mysql = require('mysql');


// define express 
const app = express();

// mock database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'qa_app'
})


// enhance app security
app.use(helmet());

// bodyparser to parse application/json
app.use(bodyParser.json());

// enable cors reqs
app.use(cors());

// log http reqs
app.use(morgan('combined'));

// retrieve questions
app.get('/', (req, res) => {
	
	connection.query('SELECT id, title, summary, author, count(answer) AS ansCnt FROM answers RIGHT OUTER JOIN questions ON answers.q_id = questions.id GROUP BY id', 
	function (error, results, fields) {
		if (error) {
			return res.status(400).send();
		} else {
			res.send(results);
		}
	});
	
});

// get one specific question
app.get('/:id', (req, res) => {
	//const question = questions.filter(q => (q.id === parseInt(req.params.id)));
	const q_id = req.params.id;

	
	// mysql query to select qid, title, summary, author, and all answers 
	connection.query('SELECT id, title, summary, author, GROUP_CONCAT(answer) AS answers FROM answers RIGHT OUTER JOIN questions ON answers.q_id = questions.id WHERE id = ? GROUP BY id;', [q_id], 
	function(error, results, fields) {
		if (error) {
			return res.status(400).send();
		} else if (results.length > 1) {
				return res.status(500).send();
		} else if (results.length === 0) {
			return res.status(404).send();
		}	else {
			console.log(results[0]);
			res.send(results[0]);
			return res.status(666).send();
		}
	});
	
});

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://<YOUR_AUTH0_DOMAIN>/.well-known/jwks.json`
	}),
	
	audience: '<YOUR_AUTH0_CLIENT_ID>',
	issueer: `https://<YOUR_AUTH0_DOMAIN>/`,
	algorithms: ['RS256']
});


// insert a question
app.post('/', checkJwt, (req, res) => {
	const {title, description} = req.body;

	
	const newQuestion = {
		"title": title,
		"summary": description,
		"author": req.user.name
	};
	
	// instead of a push to an array, now we insert the question into the table in our db
	connection.query('INSERT INTO questions SET ?', newQuestion, function(error, results, fields) {
		if (error) {
			console.log("error in insert");
			res.status(400).send();
		} else {
			res.status(200).send();
		}
	});
	
});

// insert an answer
app.post('/answer/:id', checkJwt, (req, res) => {
	const {answer} = req.body;
	const q_id = req.params.id
	
	// we should only get one question per q_id
	connection.query('SELECT * FROM questions WHERE id = ?', [q_id], function(error, results, fields) {
		if (error) {
			return res.status(400).send();
		} else if (results.length > 1) {
				return res.status(500).send();
		} else if (results.length === 0) {
			return res.status(404).send();
		}
	});
	
	const ansJSON = {
		"q_id": q_id,
		"answer": answer
	}
	
	// insert new answer into the answer table of the database
	connection.query('INSERT INTO answers SET ?', ansJSON, function(error, results, fields) {
		if (error) {
			res.status(400).send();
		} else {
			res.status(200).send();
		}
	});
	

})



// listen on port 8081 
app.listen(8081, () => {
	console.log('listening on port 8081');
});



