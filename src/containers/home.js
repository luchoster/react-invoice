import React       from 'react'
import { connect } from 'react-redux'
import moment      from 'moment'
// import { Divider } from 'material-ui'
import ItemsRows   from '../components/item-rows'
import {
  TextField
} from 'material-ui'

class Home extends React.Component {
  state = {
    logo: 'http://compuexpress.us/wp-content/uploads/2016/09/logo-v.png',
    invoice: {
      invoice_no: 1
    }
  }

  imgUploaded = event => {
    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.setState({logo: e.target.result})
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  render() {
    return(
      <div className="app container">
        <header className="row">
          <div className="col">
            <span className="user-logo">
              <img alt="" src={this.state.logo} />
              <input type="file" accept="image/*" onChange={this.imgUploaded} />
            </span>
          </div>
          <div className="col-sm-3">
            <div className="invoice row">
              <TextField
                className="col text-left input-invoice"
                label="Invoice Number"
                margin="normal"
                name="invoice_no"
                type="number"
                onChange={ e => console.log(e.target.value) }
              />
            </div>
            <div className="date row">
              <TextField
                className="col text-left input-date"
                label="Date"
                margin="normal"
                name="date"
                type="date"
                defaultValue={moment().format("MM-DD-YYYY")}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </div>
        </header>
        <section className="row">
          <section className="left-block invoice-no col">
            <address>
              <div className="row">
                <TextField
                  className="col-sm-6"
                  label="Company and/or Name"
                  name="company_name"
                />
              </div>
              <div className="row">
                <TextField
                  className="col-sm-6"
                  label="Address"
                  name="user_address"
                  multiline
                  rowsMax="2"
                />
              </div>
              <div className="row">
                <TextField
                  className="col-sm-6"
                  label="Phone Number"
                  name="phone_no"
                />
              </div>
            </address>
          </section>
          <section className="col right-block align-items-end">
            <div className="client-info">
              <address>
                <div className="row">
                  <TextField
                    className="col-sm-6 align-self-end"
                    label="Company and/or Name"
                    name="company_name"
                  />
                </div>
                <div className="row">
                  <TextField
                    className="col-sm-6"
                    label="Address"
                    name="user_address"
                    multiline
                    rowsMax="2"
                  />
                </div>
                <div className="row">
                  <TextField
                    className="col-sm-6"
                    label="Phone Number"
                    name="phone_no"
                  />
                </div>
              </address>
            </div>
          </section>
        </section>
        <section className="row">
         <ItemsRows />
        </section>
        <section className="row">
          <section className="col">
            <div contentEditable suppressContentEditableWarning className="text-center">
              <p>Make all checks payable to </p>
              <h2><em>CompuExpress US</em></h2>
              <p />
              <h2>Thank you for your business!</h2>
            </div>
          </section>
          <section className="col">
            <div className="row">
              <div className="col text-right">
                <p>Sub Total: </p>
              </div>
              <div className="col">
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <p>Tax: </p>
              </div>
              <div className="col">
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                <p>Total: </p>
              </div>
              <div className="col">
              </div>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.User
})


export default connect(mapStateToProps, null)(Home)
