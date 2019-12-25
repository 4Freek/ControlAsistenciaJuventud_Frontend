import React from 'react';
import axios from 'axios';

export default class Gallery extends React.Component {
	constructor(props) {
		super(props)
		//this.imgContent = React.createRef();
		this.state = {
			galleries: [],
			current: 1,
			perPage: 21,
			pages: null,
			isScrolling: false
		}
	}

	componentDidMount() {
		this.loadGallery();
		/*window.addEventListener('scroll', e => {
		  this.handleScroll(e)
		});*/
	}

	render() {

		return (
			<div className="container ">
				<div class="row gallery">
					{this.state.galleries.map(gallery => (
					<div className="card img-fluid" key={gallery._id}>
						<img className="card-img-top" src={gallery.photo} alt="imagen" />
					</div>
					))}
				</div>
				<div class="mx-auto mt-2 p-2">
					<button className="btn btn-light btn-block" onClick={this.loadMore}>
						Load More
					</button>
				</div>
			</div>
		)
	}

		loadGallery = async () => {
		const {galleries, current, perPage } = this.state;
		const url = `http://localhost:4000/api/childs/Gallery?perPage=${perPage}&page=${current}`;

		const res = await axios.get(url)
		this.setState({
			galleries: [...galleries, ...res.data.galleries],
			pages: res.data.pages,
			isScrolling: false,
		})

	}

	/*handleScroll = e => {
		const {isScrolling, pages, current} = this.state;
		console.log(current)
		if (isScrolling) return
		if (pages <= current) return

		const lastLi = this.imgContent.current.lastChild;
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;
		var bottomOffset = 70;

		if (pageOffset > lastLiOffset - bottomOffset) this.loadMore();
	}*/

	loadMore = () => {
		this.setState(prevState => ({
			current: prevState.current + 1,
		}), this.loadGallery);
	}
}