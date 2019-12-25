import React from 'react';

import axios from 'axios';

export default class Brigada extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			brigadistas: []
		}

		this.getBrigada = this.getBrigada.bind(this);
	}

	UNSAFE_componentWillMount() {
		this.getBrigada();
	}

	render() {
		const srcImg = 'http://localhost:4000/';

		return (
			<div className="container">
				<div className="row">
					<div className="card-columns">
						{this.state.brigadistas.map(brigadista => (
							<div className="card" key={brigadista._id}>
								<img src={srcImg + brigadista.photo} alt="imagen"
								className="card-img-top" />
								<div className="card-body p-2">
									<h3 className="card-title bg-light">
										{brigadista.nick}
									</h3>
									<p><span>{'Edad: ' + brigadista.edad}</span></p>
									<p><span>{'Skills: ' + brigadista.skills}</span></p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	getBrigada = async () => {
		const res = await axios.get('http://localhost:4000/api/childs/Brigada');

		this.setState({brigadistas: res.data.childs});
	}
}