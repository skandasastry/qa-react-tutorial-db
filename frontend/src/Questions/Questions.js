import {Link} from 'react-router-dom';
import React, {Component} from 'react';

import axios from 'axios';

class Questions extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			questions: null,
		};
	}
	
	async componentDidMount() {
		const questions = (await axios.get('http://localhost:8081')).data;
		this.setState({
			questions,
		});
	}
	
	render() {
		return (
			<div className="container">
				<div className="row">
				<Link to="/new-question">
					<div className="card text-white bg-secondary mb-3">
					<div className="card-header"> need help? ask Here! </div>
					<div className = "card-body">
						<h4  className="card-title"> + New Question </h4>
	
					</div>
					</div>
				</Link>
				
				{this.state.questions === null && <p> Loading questions...</p>}
					{
						this.state.questions && this.state.questions.map(question => (
							<div key={question.id} className = "col-sm-12 col-md-4 col-lg-3">
								<Link to={`/question/${question.id}`}>
									<div className="card text-white bg-success mb-3">
									<div className = "card-header"> Answers: {question.ansCnt}</div>
									<div className="card-body">
										<h4 className ="card-title">{question.title}</h4>
										<p className = "card-text">{question.description} </p>
									</div>
									</div>
								</Link>
							</div>
						
						))
					}
				</div>
			</div>
		)
	}
}

export default Questions;