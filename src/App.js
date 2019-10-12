import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import './App.css';

class TitleList extends React.Component {
  constructor(){
    super();
    this.state = {
      titles: [],
      sortKey: "Title",
      failure: false
    };
    
    let titles = fetch("titles.json")
    titles.then(data => {
      data = data.json().then(data => {
        this.setState({titles: data})
        console.log(data)
      }, this.reject)
    }, this.reject)
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
      },
      {
        id: "Char",
        Header: "Character Required",
        filterable: true,
        accessor: 'Char',
        minWidth: 150,
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
      <ReactTable data={state.titles} filterable={true} defaultPageSize={25} columns={columns} style={{
        maxHeight: "calc(100vh - 130px)"
      }} className="-striped -highlight"></ReactTable>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Vindi Titles
        </h1>
        <TitleList></TitleList>
      </header>
    </div>
  );
}

export default App;
