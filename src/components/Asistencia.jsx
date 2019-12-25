import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class ChildList extends Component {
	constructor(props) {
		super(props)
		this.nick = React.createRef();
		this.state = {
			childs: [],
			date: new Date(),
			current: 1,
			pages: null,
		}

		this.getChild = this.getChild.bind(this);
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
	}

	// Ciclos de Vida

	UNSAFE_componentWillMount() {
		this.getChild();
	}

	UNSAFE_componentWillUpdate(nextProps, nextState) {
		if (this.state.childs !== nextState) {
			return true
		}
	}

	// ----------------------------------------


	// Render de data Front

	render() {
		if (this.state.childs.length === 0) {
			return <div className="container mx-auto h-auto">
				<h1>Loading...</h1>
			</div>
		}

		this.state.childs.forEach(child => {
			if (child.hours >= 8) {
				child.className = "list-group-item list-group-item-action d-flex justify-content-between";
			}else if (child.hours > 0 && child.hours <= 8) {
				child.className = "list-group-item list-group-item-action d-flex justify-content-between list-group-item-warning";
			}else {
				child.className = "list-group-item list-group-item-action d-flex justify-content-between list-group-item-danger";
			}
		});

		return (
			<div className="container border-0 m-auto">
				<div className="row offset-md-1">
					<div className="col-md-4">
						<div className="card card-body">
							<div className="form-group">
								<input type="text" className="form-control" name="nick_search" ref={this.nick} placeholder="Nickname"
								onChange={this.onInputChange} />
							</div>
							<div className="form-group">
								<DatePicker selected={this.state.date} className="form-control"
								onChange={date => this.setState({date})} />
							</div>
							<form onSubmit={this.send}>
								<button type="submit" className="btn btn-primary btn-block" id="btn_submit">
										Asistencia
								</button>
							</form>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Buscar"
							onChange={this.searchChange}/>
						</div>
						<ul className="list-group list-unstyled"></ul>

						<div className="container">
							<div className="row mt-1">
								<div className="col">
									<div className="mr-auto justify-content-start">
										<button className="btn btn-link" onClick={this.reload}>Reload</button>
									</div>
								</div>
								<div className="col ml-auto">
									<div className="row d-inline-flex justify-content-between" id="page">
										<div className="col">
											<button className="btn btn-link" onClick={this.prev}>Prev</button>
										</div>
										<div className="col">
											<button className="btn btn-link" onClick={this.next}>Next</button>
										</div>
									</div>
								</div>
							</div>
							
							<ul className="list-group-flush list-unstyled">
								{this.state.childs.map(child => (
									<li className={child.className} key={child._id}
									onClick={e => this.click(e, child.nick)} onMouseOver={(e) => this.overChild(e, child.nick)}>
										{child.nick + ' '}
										<span className="badge badge-primary badge-pill">{child.hours + ' horas'}</span>

									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}

		// Render de data desde el servidor Back

	async getChild(page=1) {
		const res = await axios.get("http://localhost:4000/api/childs/Asistencia/" + page || 1)
		this.setState({childs: res.data.childs, current: res.data.current, pages: res.data.pages});
	}

	send = async e => {
		e.preventDefault();
		e.stopPropagation();
		const nick = this.nick.current.value;

		await axios.put('http://localhost:4000/api/childs/Asistencia', {
			nick,
			date: this.state.date
			});

		this.getChild();
	}

	// --------------------------------------------------------------------

	// Render desde el front 

	// ---------------------------------------------------------------

	// Capturas de enventos
	onInputChange = e => {
		this.setState({nick_search: e.target.value});
	}

	click = (e, nick) => {
		this.nick.current.value = nick;
	}

	searchChange = e => {
		
	}

	overChild = (e, nick) => {
		// e.target.classList.add('pulse');
	}

	reload = e => {
		e.preventDefault();
		e.stopPropagation();
		this.getChild(Number(this.state.current));
	}

	prev = function(e) {
		e.preventDefault();
		e.stopPropagation();
		let page = Number(this.state.current);
		let newPage = page === 1 ? 1 : page -1;
		this.getChild(Number(newPage));
	}

	next = function(e) {
		e.preventDefault();
		e.stopPropagation();
		let page = Number(this.state.current);
		let newPage = page !== this.state.pages ? page +1 : this.state.pages;
		this.getChild(Number(newPage));
	}

	// ----------------------------------------------------------------------
	

}