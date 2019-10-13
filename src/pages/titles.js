import React from 'react';
import ReactTable from 'react-table'
import _ from 'lodash'
import 'react-table/react-table.css'
import 'App.css';

/**
 * @param {string} str - A string to sanitize
 * @return {string}
 */
function sanitize(str){
  return _.deburr(String(str)).toLowerCase();
}

/**
 * @param {(row: string, filter: string)=>boolean} comparator - A string to sanitize
 * 
 */
function genFilter(comparator){
  return (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? comparator(sanitize(row[id]), sanitize(filter.value), row) : comparator(null, sanitize(filter.value), row)
  }
}

let cache = {}

class TitleList extends React.Component {
  constructor(){
    super();
    this.state = {
      titles: [],
      failure: false
    };
    
    if (!cache.titles) {
        let titles = fetch("titles.json")
        titles.then(data => {
        data = data.json().then(data => {
            _.forEach(data, (r)=>{
            if (!r.Char) {
                r.Char = "All"
            }
            if (r.Tags) {
                r.Tags = _.map(r.Tags, sanitize)
            }
            })
            cache.titles = data.slice();
            this.setState({titles: cache.titles})
        }, this.reject)
        }, this.reject)
    } else {
        this.state.titles = cache.titles;
    }
  }

  reject(err){
    this.setState({failure: err})
  }

  render() {
    const state = this.state
    if (state.failure) {
      return (
        <div>Failed to get title list</div>
      )
    }
    
    const columns = [
      {
        id: "Account",
        Header: "ID",
        accessor: 'Account',
        maxWidth: 60,
        filterable: false,
        Cell: ({original: prop})=> {
          return prop ? (prop.Account === 1 ? "ID" : "") : ""},
        resizable: false,
      },
      {
        id: "Title",
        Header: "Title",
        filterable: true,
        accessor: 'Title',
        minWidth: 250,
      },
      {
        id: "Desc",
        Header: "Description",
        filterable: true,
        accessor: 'Desc',
        minWidth: 350,
      },
      {
        id: "Obtain",
        Header: "How to Obtain",
        filterable: true,
        accessor: 'Obtain',
        minWidth: 250,
        filterMethod: genFilter((val, filter, row)=>{
          return (val && val.includes(filter)) || (row._original && row._original.Tags && _.indexOf(row._original.Tags, filter) >= 0)
        })
      },
      {
        id: "Char",
        Header: "Character Required",
        filterable: true,
        accessor: 'Char',
        minWidth: 150,
        /*filterMethod: genFilter((val, filter)=>{
          return !val || val === "" ||
            (val && (val === "all" || val === "" || val.includes(filter)))
        }),*/
      },
      {
        id: "STR",
        Header: "Str",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'STR',
      },
      {
        id: "DEX",
        Header: "Agi",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'DEX',
      },
      {
        id: "INT",
        Header: "Int",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'INT',
      },
      {
        id: "WILL",
        Header: "Wil",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'WILL',
      },
      {
        id: "ATK",
        Header: "Atk",
        filterable: false,
        resizable: false,
        maxWidth: 60,
        accessor: 'ATK',
      },
      {
        id: "MATK",
        Header: "M.Atk",
        filterable: false,
        resizable: false,
        maxWidth: 60,
        accessor: 'MATK',
      },
      {
        id: "BAL",
        Header: "Bal",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'BAL',
      },
      {
        id: "CRIT",
        Header: "Crit",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'CRIT',
      },
      {
        filterable: false,
        maxWidth: 20,
        minWidth: 20,
        resizable: false,
        sortable: false,
      },
    ]
    return (
      <ReactTable data={state.titles} filterable={true} defaultPageSize={25} columns={columns} showPageJump={false}
      defaultFilterMethod={genFilter((val, filter)=>val && val.includes(filter))}
      style={{
        maxHeight: "100%"
      }} className="-striped"></ReactTable>
    )
  }
}

class TitlePage extends React.Component {
    render() {
        return(
        <div style={{
            height: "calc(95vh - 200px)",
        }}>
            <header className="App-header">
                <h1>
                Vindi Titles
                </h1>
            </header>
            <TitleList></TitleList>
        </div>
        );
    }
}

export default TitlePage;