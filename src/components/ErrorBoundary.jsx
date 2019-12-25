import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			errorLog: ''
		}
	}

	static getDerivedStateFromError(error) {
		return {error: true, errorLog: error}
	}

	componentDidCatch(error) {
		console.log(error, this.state.errorLog)
	}

	render() {
		if (this.state.error) {
			return <h1>Algo anda mal...</h1>
		}

		return this.props.children
	}
}