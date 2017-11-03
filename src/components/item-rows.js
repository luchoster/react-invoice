import * as R     from 'ramda'
import React      from 'react'
import ReactTable from 'react-table'
import { Button } from 'material-ui'
import AddIcon    from 'material-ui-icons/Add'

class ItemsRows extends React.Component {
  state = {
    data: [{
      item        : "",
      description : "",
      rate        : 0,
      qty         : 0,
      price       : 0
    }],
    minRows: 1
  }

  renderEditable = (cellInfo) => {
    return(
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        className="text-center"
        suppressContentEditableWarning
        onBlur={ e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    )
  }

  addRow = () => {
    this.setState({
      data: R.insert(R.last, {
        item        : "",
        description : "",
        rate        : 0,
        qty         : 0,
        price       : 0
      })(this.state.data)
    })
  }

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
              style:{
                'white-space':'initial'
              }
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
        <Button className="add-btn" dense color="primary" fab aria-label="add" onTouchTap={() => this.addRow() }>
          <AddIcon />
        </Button>
      </div>
    )
  }
}

export default ItemsRows
