import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<Link className="navbar-brand" to="/">
						<img className="d-inline-block align-top" src="juventud-logo.png" width="30" height="30" alt="juventud-img"/>
						Juventud
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/Brigada">
									Brigada
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/Gallery">
									Gallery
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/Calendary">
									Calendary
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/Asistencia">
									Asistencia
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/CreateNewChild">
									Create New Child
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}
