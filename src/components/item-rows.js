import React from 'react'
import ReactTable from 'react-table'

class ItemsRows extends React.Component {
  state = {
    data: []
  }
  render() {
    return(
      <div>
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Item",
              accessor: "item"
            },
            {
              Header: "Description",
              accessor: "description"
            },
            {
              Header: "Rate",
              accessor: "price"
            },
            {
              Header: "Qty",
              accessor: "qty"
            },
            {
              Header: "Price",
              accessor: "price"
            }
          ]}
        />
      </div>
    )
  }
}

export default ItemsRows
