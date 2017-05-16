import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';

class GithubSortOptions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedOption: null,
			options: [
				{ value: 'updated_at', label: 'Most Recent Update'},
				{ value: 'name', label: 'Alphabetical' },
				{ value: 'forks_count', label: 'Most # Forks' },
				{ value: 'stargazers_count', label: 'Most # Stars' },
				{ value: 'open_issues', label: 'Most # Open Issues' },
				{ value: 'watchers_count', label: 'Most # Watchers' },
			],
		}

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.onChange(this.state.options[this.state.options.length - 1]);
	}

	onChange(value) {
		this.setState({
			selectedOption: value,
		})

		if (this.props.onSortChange) {
			this.props.onSortChange(value);
		}
	}


	render() {
		const {
			selectedOption,
			options
		} = this.state;
		
		const {
			containerClassName,
			labelClassName,
			selectClassName,
		} = this.props;

		return (
			<div className={containerClassName || ''}>
				<label className={labelClassName || ''}>
					<span>Sort repos by...</span>
				</label>
				<Select
					className={selectClassName || ''}
					value={selectedOption}
					options={options}
					onChange={this.onChange}
					clearable={false}
				/>
			</div>
		)
	}
}

export default GithubSortOptions;