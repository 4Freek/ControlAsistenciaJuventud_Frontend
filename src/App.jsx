import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
// import Footer from './components/Footer';
import Brigada from './components/Brigada';
import Gallery from './components/Gallery';
import Calendary from './components/Calendary';
import Asistencia from './components/Asistencia';
import Squad from './components/Squad';
import CreateNewChild from './components/CreateNewChild';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
	return (
		<ErrorBoundary>
		<Router>
			<Navigation />
			<div className="container p-3">
				<Route path="/Brigada" component={Brigada} />
				<Route path="/Gallery" component={Gallery} />
				<Route path="/Calendary" component={Calendary} />
				<Route path="/Asistencia" component={Asistencia} />
				<Route path="/Squad" component={Squad} />
				<Route path="/CreateNewChild" component={CreateNewChild} />
			</div>
		</Router>
		</ErrorBoundary>

	)
}


export default App;
