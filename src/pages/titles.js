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
              _.forEach(r, (value, key) => {
                if (value === null){
                  delete r[key];
                }
              })
              
            if (!r.Char) {
                r.Char = "All"
            }
            if (r.tags) {
                r.tags = _.map(r.tags, sanitize)
            }
            })
            //console.log(JSON.stringify(data));
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
        id: "shared",
        Header: "id",
        accessor: 'shared',
        maxWidth: 60,
        filterable: false,
        Cell: ({original: prop})=> {
          return prop ? (prop.Account === 1 ? "ID" : "") : ""},
        resizable: false,
      },
      {
        id: "title",
        Header: "Title",
        filterable: true,
        accessor: 'title',
        minWidth: 250,
      },
      {
        id: "desc",
        Header: "Description",
        filterable: true,
        accessor: 'desc',
        minWidth: 350,
      },
      {
        id: "goal",
        Header: "How to Obtain",
        filterable: true,
        accessor: 'goal',
        minWidth: 250,
        filterMethod: genFilter((val, filter, row)=>{
          return (val && val.includes(filter)) || (row._original && row._original.tags && _.indexOf(row._original.tags, filter) >= 0)
        })
      },
      {
        id: "chars",
        Header: "Character Required",
        filterable: true,
        accessor: 'chars',
        minWidth: 150,
        /*filterMethod: genFilter((val, filter)=>{
          return !val || val === "" ||
            (val && (val === "all" || val === "" || val.includes(filter)))
        }),*/
      },
      {
        id: "str",
        Header: "Str",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'str',
      },
      {
        id: "agi",
        Header: "Agi",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'agi',
      },
      {
        id: "int",
        Header: "Int",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'int',
      },
      {
        id: "wil",
        Header: "Wil",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'wil',
      },
      {
        id: "hp",
        Header: "HP",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'hp',
      },
      {
        id: "atk",
        Header: "Atk",
        filterable: false,
        resizable: false,
        maxWidth: 60,
        accessor: 'atk',
      },
      {
        id: "matk",
        Header: "M.Atk",
        filterable: false,
        resizable: false,
        maxWidth: 60,
        accessor: 'matk',
      },
      {
        id: "bal",
        Header: "Bal",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'bal',
      },
      {
        id: "crit",
        Header: "Crit",
        filterable: false,
        resizable: false,
        maxWidth: 40,
        accessor: 'crit',
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