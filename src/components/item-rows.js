import * as R     from 'ramda'
import React      from 'react'
import ReactTable from 'react-table'
import { Button } from 'material-ui'

class ItemsRows extends React.Component {
  state = {
    data: [{
      item:"",
      description:"",
      rate: "",
      qty: "",
      price: ""
    }],
    minRows: 1
  }

  renderEditable = (cellInfo) =>
    <div
      style={{ backgroundColor: "#fafafa" }}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        const data = [...this.state.data];
        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        this.setState({ data });
      }}
      dangerouslySetInnerHTML={{
        __html: this.state.data[cellInfo.index][cellInfo.column.id]
      }}
    />

  addRow = () =>
    this.setState({
      data: R.insert(R.last, {
          item:"",
          description:"",
          rate: "",
          qty: "",
          price: ""
      })(this.state.data)
    })

  render() {
    return(
      <div className="col">
        <ReactTable
          data={this.state.data}
          minRows={this.state.minRows}
          noDataText="Oh Noes!"
          showPagination={false}
          columns={[
            {
              Header: "Item",
              accessor: "item",
              className: "col",
              Cell: this.renderEditable,
              id: "item"
            },
            {
              Header: "Description",
              accessor: "description",
              className: "col",
              Cell: this.renderEditable,
            },
            {
              Header: "Rate",
              accessor: "rate",
              className: "col",
              Cell: this.renderEditable,
              id: "rate"
            },
            {
              Header: "Qty",
              accessor: "qty",
              className: "col",
              Cell: this.renderEditable,
              id: "qty"
            },
            {
              Header: "Price",
              accessor: "price",
              className: "col",
              Cell: this.renderEditable,
              id: "price"
            }
          ]}
        />
        <Button onTouchTap={() => this.addRow() }>+</Button>
      </div>
    )
  }
}

export default ItemsRows
