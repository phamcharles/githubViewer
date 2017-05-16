import React, { Component } from 'react';
import GithubUsersOptions from '../GithubUsersOptions';
import GithubSortOptions from '../GithubSortOptions';
import GithubReposList from '../GithubReposList';
import GithubCommitsList from '../GithubCommitsList';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: null,
			repo: null,
			commit: null,
			sortOption: null,
		}

		this.onUserChange = this.onUserChange.bind(this);
		this.onRepoClick = this.onRepoClick.bind(this);
		this.onCommitClick = this.onCommitClick.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
	}

	onUserChange(user) {
		this.setState({
			user
		})

		if (user === null) {
			this.onRepoClick(null);
		}
	}

	onRepoClick(repo) {
		this.setState({
			repo
		})
		if (repo === null) {
			this.onCommitClick(null);
		}
	}

	onCommitClick(commit) {
		this.setState({
			commit
		})

		if (commit !== null) {
			window.open(commit.htmlUrl, '_blank');
		}
	}

	onSortChange(sortOption) {
		this.setState({
			sortOption
		})
	}

	render() {
		const {
			user,
			repo,
			sortOption,
		} = this.state;

		let commitsUrl = null;
		if (!!repo) {
			commitsUrl = repo.commits_url.split('{')[0] || null;
		}

		// console.log(user, repo);

		return (
			<div className="app-container">
				<aside className="aside-container">
					<section className="logo-container">
						<h1 className="title">Github Viewer</h1>
					</section>
					<section className="aside-filters-section">
						<GithubUsersOptions
							containerClassName="aside-filter-user"
							user={user}
							onUserChange={this.onUserChange}
							smartDefaultDemo={'Netflix'}
						/>
						
						<GithubSortOptions
							onSortChange={this.onSortChange}
						/>
					</section>

					<section className="selected-section">
						<pre>
							{JSON.stringify(this.state, null, 1)}
						</pre>

					</section>
				</aside>

				<main className="main-container">
					<section className="main-upper-section">
						<GithubReposList
							repoUrl={!!user ? user.repos_url : null}
							onRepoClick={this.onRepoClick}
							sortBy={!!sortOption ? sortOption.value : null}
							smartDefaultDemo={true}
						/>
					</section>
					<section className="main-lower-section">
						<GithubCommitsList
							commitsUrl={commitsUrl}
							onCommitClick={this.onCommitClick}
						/>
					</section>
				</main>
			</div>
		)
	}
}

export default App


