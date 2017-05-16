import React, { Component } from 'react';
import { Column, Table } from 'react-virtualized';
import moment from 'moment';

class GithubCommitsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      commits: [],
    }

    this.getCommits = this.getCommits.bind(this);
  }

  componentDidMount() {
    const commitsUrl = this.props.commitsUrl;
    this.getCommits(commitsUrl);
  }

  componentWillReceiveProps(nextProps) {
    const commitsUrl = nextProps.commitsUrl;
    this.getCommits(commitsUrl);
  }

  getCommits(commitsUrl = null) {
    if (commitsUrl !== null) {
      this.setState({
        isLoading: true,
      })

      return fetch(commitsUrl)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          commits: json,
          isLoading: false,
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({
          isLoading: false,
        })
      })
    } else {
      this.setState({
        commits: [],
      })
    }
  }

  render() {
    const {
      commits
    } = this.state;
    const {
      commitsUrl
    } = this.props;


    const filteredCommits = commits.map(commit => {
      return {
        lastUpdated: commit.commit.author.date,
        author: commit.commit.author.name,
        sha: commit.sha,
        message: commit.commit.message,
        url: commit.url,
        htmlUrl: commit.html_url,
      }
    })

    const sortedCommits = filteredCommits.sort((a,b) => moment(a.lastUpdated).isAfter(b.lastUpdated) ? -1 : 1)
    return (
      <Table
        width={1000}
        height={400}
        headerHeight={20}
        rowHeight={30}
        rowCount={sortedCommits.length}
        rowGetter={({ index }) => sortedCommits[index]}
        onRowClick={(data) => {
          if (this.props.onCommitClick) {
            this.props.onCommitClick(data.rowData);
          }
        }}
      >
        <Column
          label='Author'
          dataKey='author'
          width={200}
        />

        <Column
          label='SHA'
          dataKey='sha'
          width={100}
          cellDataGetter={function ({
              columnData,
              dataKey,
              rowData,
            }) {
              return rowData[dataKey].substring(0, 7);
            }
          }
        />

        <Column
          label='Message'
          dataKey='message'
          width={300}
        />

        <Column
          label='Updated Timestamp'
          dataKey='lastUpdated'
          width={200}
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
          label='Last Updated'
          dataKey='lastUpdated'
          width={200}
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

export default GithubCommitsList