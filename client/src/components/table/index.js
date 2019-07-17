import React from "react";
import stickybits from "stickybits";
import styles from "./table.module.css";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    stickybits("#rwjtth");
    console.log("sticky", stickybits);
  }

  render() {
    // Data
    const {columns: dataColumns, rows: dataRows } = this.props.data;
    const tableHeaders = (
      <thead>
        <tr>
          {dataColumns.map(column => 
            <th style={{ background: "#fff", width: column.width }} id="rwjtth">
              {column.displayName}
          </th>)}
              </tr>
          </thead>
);
    
        const tableBody = dataRows.map((row)=>{
          return (
            <tr>
              {dataColumns.map((column)=> {
                return <td>{column.renderItem? column.renderItem(row):row[column.columnName]}</td>; })}
            </tr>); 
            });
         console.log("styles ", styles)
        // Decorate with Bootstrap CSS: 
        return (<table>
            {tableHeaders}
            <tbody className={styles.tbody}>
            {tableBody}
            </tbody>
          </table>);
  }
}

const TableContainer = props => (
  <div className={styles.containerdiv}>
    <Table {...props} />
  </div>
);

export default TableContainer;
