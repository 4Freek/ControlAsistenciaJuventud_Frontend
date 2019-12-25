import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class Squad extends React.Component {
	constructor(props) {
		super(props)
		this.file = React.createRef();
		this.state = {
			image: '',
			nick: '',
			edad: '',
			phone: '',
			skills: [],
			hobbies: [],
			bDay: new Date(),
		}
		this.send = this.send.bind(this)
	}

	render() {
		return (
				<div className="container">
					<div className="col-md-4 offset-md-4">
						<div className="input-group mb-3">
							<div className="custom-file">
								<input type="file" name="image" 
								id="inputFile" aria-describedby="inputFile" className="custom-file-input" 
								onChange={this.fileChange} ref={this.file} />
								<label htmlFor="inputFile" className="custom-file-label">Elige Imagen</label>
							</div>
						</div>
						<div className="form-group">
							<input type="text" className="form-control" name="nick" placeholder="Nickname" 
							onChange={this.inputChange} />
						</div>
						<div className="form-group">
							<input type="text" name="edad" className="form-control" placeholder="Edad" 
							onChange={this.inputChange} />
						</div>
						<div className="form-group">
							<input type="text" name="phone" className="form-control" placeholder="phone" 
							onChange={this.inputChange} />
						</div>
						<div className="form-group">
							<input type="text" name="skills" className="form-control" placeholder="skills" 
							onChange={this.inputChange} />
						</div>
						<div className="form-group">
							<input type="text" name="hobbies" className="form-control" placeholder="hobbies" 
							onChange={this.inputChange} />
						</div>
						<div className="form-group">
							<DatePicker selected={this.state.bDay} onChange={this.birthDay} className="form-control" />
						</div>
						<div className="input-group">
							<button type="submit" className="btn btn-primary" onClick={this.send}>
								Enviar
							</button>
						</div>
					</div>
				</div>
			)
	}

	inputChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	birthDay = birthDay => {
		this.setState(birthDay)
		console.log(this.state.bDay)
	}

	fileChange = e => {
		this.setState({image: this.file.current.files[0]})
		console.log(this.state.image.name)
	}

	send = async e => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('image', this.state.image);
		formData.append('nick', this.state.nick);
		formData.append('edad', this.state.edad);
		formData.append('phone', this.state.phone);
		formData.append('skills', this.state.skills);
		formData.append('hobbies', this.state.hobbies);
		formData.append('birthDay', this.state.bDay);
		
		const res = await axios.post('http://localhost:4000/api/childs/Brigada', formData, {})

		console.log(res.data)
	}
}