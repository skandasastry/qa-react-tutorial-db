import React, {Component} from 'react';
import axios from 'axios';
import auth0Client from '../Auth';
import SubmitAnswer from './SubmitAnswer';

class Question extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			question: null,
		};
		
		this.submitAnswer = this.submitAnswer.bind(this);
	}
	
	async componentDidMount() {
		const {match : {params}} = this.props;
		const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
		
		if (question.answers !== null) {
			// returning answers as a string from mysql, need to use split to make into an array
			question.answers = question.answers.split(',');
		} else{
			// if no answers, make it an empty array
			question.answers = [];
		}
		this.setState({
			question,
		});
		
	}
	
	
	
	async refreshQuestion() {
		const {match : {params}} = this.props;
		const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
		
		if (question.answers !== null) {
			question.answers = question.answers.split(',');
		} else{
			question.answers = [];
		}
		this.setState({
			question,
		});
	
	}
	
	async submitAnswer(answer) {
		
		await axios.post(`http://localhost:8081/answer/${this.state.question.id}`,{
			answer,
		}, {
			headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}
		});
		await this.refreshQuestion();
	}
	
	
	render() {
		const {question} = this.state;
		
		if (question === null) return <p> Loading... </p>
		

		return (
			<div className = "container">
				<div className = "row">
					<div className = "jumbotron col-12">
						<h1 className = "display-3"> {question.title}</h1>
						<p className="lead">{question.summary} </p>
						<strong> Submitted By: {question.author} </strong>
						<hr className="my-4" />
						<SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer}/>
						
						<p> Answers: </p>
						{
						  question.answers.map(answer => <p> {answer} </p>)
						}
					</div>
				</div>
			</div>
		
		)
	}
}

export default Question;