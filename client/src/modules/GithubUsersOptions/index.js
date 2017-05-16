import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';

class GithubUsersOptions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isTyping: false,
			searchTerm: '',
			typingTimer: null,
			selectedUser: null,
			users: [],
			isLoading: false,
			firstRender: true,
		}

		this.getUsers = this.getUsers.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			user: this.props.user,
		})

		// Temp Demo
		if (!!this.props.smartDefaultDemo) {
			this.setState({
				searchTerm: this.props.smartDefaultDemo,
			})
			this.getUsers(this.props.smartDefaultDemo, !!this.props.smartDefaultDemo, !!this.state.firstRender);
		}
	}

	componentWillReceiveProps(nextProps) {
		// if (!this.state.firstRender) {
		// 	this.setState({
		// 		user: nextProps.user,
		// 	})

		// 	this.getUsers(nextProps.user, false);
		// }
	}

	onInputChange(value) {
		const {
			typingTimer,
		} = this.state;

		clearInterval(typingTimer);

		if (value === '') {
			this.setState({
				users: [],
			})
		}

		this.setState({
			isTyping: true,
			searchTerm: value,
		})

		const newTypingTimer = setTimeout(() => {
			this.setState({
				isTyping: false,
				typingTimer: null
			})

			this.getUsers(this.state.searchTerm);
		}, 500);

		this.setState({
			typingTimer: newTypingTimer,
		})
	}

	onChange(value) {
		this.setState({
			selectedUser: value,
		})
		
		if (this.props.onUserChange) {
			this.props.onUserChange(value);
		}
	}

	getUsers(input, smartDefaultDemo = false, firstRender = false) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		this.setState({
			isLoading: true,
		})
		return fetch(`https://api.github.com/search/users?q=${input}`)
		.then((response) => response.json())
		.then((json) => {
			this.setState({
				users: json.items,
				isLoading: false,
			})

			if (!!smartDefaultDemo && !!firstRender) {
				const user = json.items.filter(a => a.login === input)[0] || null;
				// console.log(user);
				this.onChange(user)
				this.setState({
					firstRender: false,
				})
			}
		})
		.catch(e => {
			console.log(e)
			this.setState({
				isLoading: false,
			})
		})
	}


	render() {
		const {
			selectedUser,
			users,
			isLoading,
		} = this.state;
		const {
			containerClassName,
			labelClassName,
			selectClassName,
		} = this.props;

		return (
			<div className={containerClassName || ''}>
				<label className={labelClassName || ''}>
					<span>Select Github User or Organization</span>
				</label>
				<Select
					className={selectClassName}
					autofocus
					value={selectedUser}
					valueKey="id"
					labelKey="login" 
					options={users}
					isLoading={isLoading}
					onChange={this.onChange}
					onInputChange={this.onInputChange}
					placeholder='Search Github user...'
					loadingPlaceholder='Loading special unicorns...'
					noResultsText='No users found'
				/>
			</div>
		)
	}
}

export default GithubUsersOptions;