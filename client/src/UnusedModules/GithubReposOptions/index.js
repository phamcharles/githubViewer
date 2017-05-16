import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';

class GithubReposOptions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// isTyping: false,
			// searchTerm: '',
			// typingTimer: null,
			selectedRepo: null,
			repos: [],
			isLoading: false,
		}

		this.getRepos = this.getRepos.bind(this);
		this.onChange = this.onChange.bind(this);
		// this.onInputChange = this.onInputChange.bind(this);
	}

	componentDidMount() {
		this.getRepos(this.props.userReposUrl);
	}

	componentWillReceiveProps(nextProps) {
		this.getRepos(nextProps.userReposUrl);
	}

	// onInputChange(value) {
	// 	const {
	// 		typingTimer,
	// 	} = this.state;

	// 	clearInterval(typingTimer);

	// 	if (value === '') {
	// 		this.setState({
	// 			repos: [],
	// 		})
	// 	}

	// 	this.setState({
	// 		isTyping: true,
	// 		searchTerm: value,
	// 	})

	// 	const newTypingTimer = setTimeout(() => {
	// 		this.setState({
	// 			isTyping: false,
	// 			typingTimer: null
	// 		})

	// 		this.getRepos(this.state.searchTerm);
	// 	}, 500);

	// 	this.setState({
	// 		typingTimer: newTypingTimer,
	// 	})
	// }

	onChange(value) {
		this.setState({
			selectedRepo: value,
		})
		
		if (this.props.onRepoChange) {
			this.props.onRepoChange(value);
		}
	}

	getRepos(userReposUrl = null) {
		if (userReposUrl !== null) {
			this.setState({
				isLoading: true,
			})

			return fetch(userReposUrl)
			.then((response) => response.json())
			.then((json) => {
				this.setState({
					repos: json,
					isLoading: false,
				})
			})
			.catch(e => {
				console.log(e)
				this.setState({
					isLoading: false,
				})
			})
		}
	}


	render() {
		const {
			selectedRepo,
			repos,
			isLoading,
		} = this.state;

		const {
			userReposUrl
		} = this.props;

		const isDisabled = isLoading || !userReposUrl;

		return (
			<Select
				value={selectedRepo}
				valueKey="id"
				labelKey="name" 
				options={repos}
				disabled={isDisabled}
				isLoading={isLoading}
				onChange={this.onChange}
				// onInputChange={this.onInputChange}
			/>
		)
	}
}

export default GithubReposOptions;