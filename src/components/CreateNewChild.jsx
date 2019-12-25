import React, { Component } from 'react';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNewChild extends Component {

	state = {
		nick: '',
		fname: '',
		lname: '',
		ci: '',
		sexo: '',
		date: new Date()
	}

	render() {
		return (
			<div className="container">
				<div className="col-md-4 offset-md-4">
					<div className="card card-body animated fadeInDown">
						<div className="input-group mb-3">
							<div className="custom-file">
								<input type="file" name="image" className="custom-file-input" id="inputFile"
								aria-describedby="inputFile" />
								<label htmlFor="inputFile" className="custom-file-label">Elige Imagen</label>
							</div>
						</div>
						<div className="form-group">
							<input type="text"
							placeholder="Nickname"
							name="nick" className="form-control"
							onChange={this.onInputChange}/>
						</div>
						<div className="form-group">
							<input type="text"
							placeholder="Nombre"
							name="fname" className="form-control"
							onChange={this.onInputChange}/>
						</div>
						<div className="form-group">
							<input type="text"
							placeholder="Apellido"
							name="lname" className="form-control"
							onChange={this.onInputChange}/>
						</div>
						<div className="form-group">
							<input type="text"
							placeholder="Cedula"
							name="ci" className="form-control"
							onChange={this.onInputChange}/>
						</div>
						<div className="form-group">
							<select type="text"
							name="sexo" className="form-control"
							onChange={this.onInputChange}>
								<option value="M" key="M">M</option>
								<option value="F" key="F">F</option>
							</select>
						</div>
						<div className="form-group">
							<DatePicker
							className="form-control"
							selected={this.state.date}
							onChange={this.onDateChange} />
						</div>
						<form onSubmit={this.onSubmit}>
							<button className="btn btn-primary btn-block">
								Save
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}

	onInputChange = e => {
		this.setState({[e.target.name]: e.target.value})

	}

	onDateChange = date => {
		this.setState({date});
	}

	onSubmit = async e => {
		e.preventDefault();

		await axios.post('http://localhost:4000/api/childs', {
				nick: this.state.nick,
				fname: this.state.fname,
				lname: this.state.lname,
				ci: this.state.ci,
				type_sex: this.state.sexo,
				date: this.state.date
			}
		)
	}

}
