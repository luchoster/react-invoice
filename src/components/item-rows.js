import React from 'react'
import ReactTable from 'react-table'

class ItemsRows extends React.Component {
  state = {
    pageSize: 2,
    data: [{}]
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

  render() {
    return(
      <div className="col">
        <ReactTable
          data={this.state.data}
          noDataText="Oh Noes!"
          pageSize={this.state.pageSize}
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
      </div>
    )
  }
}

export default ItemsRows
