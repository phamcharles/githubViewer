import React, { Component } from 'react';
import { Column, Table } from 'react-virtualized';
import moment from 'moment';

class GithubReposList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      repos: [],
    }

    this.getSortedRepos = this.getSortedRepos.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    const repoUrl = this.props.repoUrl;
    this.getRepos(repoUrl);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const repoUrl = nextProps.repoUrl;

    if (repoUrl !== this.props.repoUrl) {
      this.getRepos(repoUrl);
    }

  }

  getRepos(repoUrl = null, smartDefaultDemo = false) {
    if (repoUrl !== null) {
      this.setState({
        isLoading: true,
      })


      return fetch(repoUrl)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          repos: json,
          isLoading: false,
        })

        if (!!this.props.smartDefaultDemo) {
          console.log(json[0]);
          this.props.onRepoClick(json[0]);
        }
      })
      .catch(e => {
        console.log(e)
        this.setState({
          isLoading: false,
        })
      })
    } else {
      this.setState({
        repos: [],
      })
    }
  }

  getSortedRepos() {
    const {
      repos
    } = this.state;

    const {
      sortBy = null,
    } = this.props;

    let sortedRepos = [];

    switch(sortBy) {
      case 'forks_count':
        sortedRepos = repos.sort((a,b) => a.forks_count > b.forks_count ? -1 : 1)
        break;
      case 'stargazers_count':
        sortedRepos = repos.sort((a,b) => a.stargazers_count > b.stargazers_count ? -1 : 1)
        break;
      case 'watchers_count':
        sortedRepos = repos.sort((a,b) => a.watchers_count > b.watchers_count ? -1 : 1)
        break;
      case 'open_issues':
        sortedRepos = repos.sort((a,b) => a.open_issues > b.open_issues ? -1 : 1)
        break;
      case 'updated_at':
        sortedRepos = repos.sort((a,b) => moment(a.updated_at).isAfter(b.updated_at) ? -1 : 1)
        break;
      case 'name':
      default:
        sortedRepos = repos.sort((a,b) => a.name.toLowerCase().trim() >= b.name.toLowerCase().trim() ? 1 : -1)
        break;
    }

    return sortedRepos
  }

  render() {
    const {
      repos
    } = this.state;

    const sortedRepos = this.getSortedRepos();

    return (
      <Table
        width={1000}
        height={400}
        headerHeight={20}
        rowHeight={30}
        rowCount={sortedRepos.length}
        rowGetter={({ index }) => sortedRepos[index]}
        onRowClick={(data) => {
          if (this.props.onRepoClick) {
            this.props.onRepoClick(data.rowData);
          }
        }}
      >
        <Column
          label='Name'
          dataKey='name'
          width={200}
        />
        <Column
          width={150}
          label='# Forks'
          dataKey='forks_count'
        />
        <Column
          width={150}
          label='# Stars'
          dataKey='stargazers_count'
        />
        <Column
          width={150}
          label='# Watchers'
          dataKey='watchers_count'
        />
        <Column
          width={150}
          label='# Open Issues'
          dataKey='open_issues'
        />
        <Column
          width={200}
          label='Updated Timestamp'
          dataKey='updated_at'
          cellDataGetter={function ({
              columnData,
              dataKey,
              rowData,
            }) {
              return moment(rowData[dataKey]).format('ddd, MM/DD/YY hh:mm A')
            }
          }
        />
        <Column
          width={200}
          label='Last Updated'
          dataKey='updated_at'
          cellDataGetter={function ({
              columnData,
              dataKey,
              rowData,
            }) {
              return moment(rowData[dataKey]).from(Date.now())
            }
          }
        />
      </Table>
    )
  }
}

export default GithubReposList