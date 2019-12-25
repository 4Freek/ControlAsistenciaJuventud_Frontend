import React from 'react';
import axios from 'axios';

import {format} from 'timeago.js';

export default class Calendary extends React.Component {
	constructor(props) {
		super(props)
		this.file = React.createRef();
		this.listContent = React.createRef();
		this.state = {
			calendaries: [],
			perPage: 7,
			current: 1,
			pages: null,
			isScrolling: false,
		}
	}

	componentDidMount() {
		this.loadCalendary();
		window.addEventListener('scroll', e => {
		  	this.handleScroll(e)
		});
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', e => this.handleScroll(e))

	}

	render() {

		const hardUrlImg = 'http://localhost:4000/';

		return (
			<div className="container">
				<ul className="list-unstyled" ref={this.listContent}>
				<div className="col-md-8 offset-md-2">
					{this.state.calendaries.map(calendary => (
							<li className="" key={calendary._id}>
								<div className="card justify-content-center border-0 mb-3">
									<div className="row p-2">
										<div className="col">
											<img src={hardUrlImg + calendary.photo} alt="imagen"
											className="img-fluid w-100 h-auto" style={{width: 300}} />
										</div>
										<div className="col flex-wrap">
											<p className="lead text-capitalize mt-2 border-bottom-primary-1">{calendary.title}</p>
											<p className="text-muted">{format(calendary.date)}</p>
											<div className="link">
												<a href="#" role="button" className="btn btn-outline-primary" onClick={() => this.click(calendary._id)}>
														Preview
												</a>
											</div>
										</div>									
									</div>
								</div>
								<hr id="separateCalendary" />
							</li>
						))}
					</div>
				</ul>
			</div>
			)
	}

	loadCalendary = async () => {
		const {calendaries, current, perPage } = this.state;
		const url = `http://localhost:4000/api/childs/Calendary?perPage=${perPage}&page=${current}`;

		const res = await axios.get(url)
		this.setState({
			calendaries: [...calendaries, ...res.data.calendaries],
			pages: res.data.pages,
			isScrolling: true,
		})

	}

	handleScroll = e => {
		e.stopPropagation();
		const {isScrolling, pages, current} = this.state;
		if (!isScrolling) return
		if (pages <= current) return

		const lastLi = this.listContent.current.lastChild;
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		var bottomOffset = 20;

		if (pageOffset > lastLiOffset - bottomOffset) this.loadMore();
	}

	loadMore = () => {
		this.setState(prevState => ({
			current: prevState.current + 1,
		}), this.loadCalendary);
	}

	inputChange = e => {
		this.setState({title: e.target.value})
	}

	fileChange = () => {
		this.setState({image: this.file.current.files[0]})
	}

	dateChange = date => {
		this.setState({date})
	}

	click = id => {
		console.log(id)
	}

	send = async e => {
		e.preventDefault();
		e.stopPropagation();

		const formData = new FormData();
		formData.append('image', this.state.image);
		formData.append('title', this.state.title);
		formData.append('date', this.state.date);

		const res = await axios.post('http://localhost:4000/api/childs/Calendary', formData, {})

	}


}