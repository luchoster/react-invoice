import React       from 'react'
import { connect } from 'react-redux'
import moment      from 'moment'
// import { Divider } from 'material-ui'
import ItemsRows   from '../components/item-rows'

class Home extends React.Component {
  state = {
    logo: 'http://compuexpress.us/wp-content/uploads/2016/09/logo-v.png'
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
              <p className="col text-right">Invoice #: </p>
              <p className="col text-left" contentEditable suppressContentEditableWarning>00</p>
            </div>
            <div className="date row">
              <p className="col text-right">Date: </p>
              <p className="col text-left">{moment().format("MM-DD-YYYY")}</p>
            </div>
          </div>
        </header>
        <section className="row">
          <section className="left-block invoice-no col">
            <address contentEditable suppressContentEditableWarning>
              <h2>CompuExpress US, LLC.</h2>
              <p>7655 Lone Shepherd Dr.<br />Las Vegas, NV 89166</p>
              <p>(702) 514-0607</p>
              <p>http://compuexpress.us</p>
            </address>
          </section>
          <section className="col right-block text-right">
            <div className="client-info">
              <address contentEditable suppressContentEditableWarning>
                <h2>Company Name <br />c/o Contact Name</h2>
                <p>Address<br />City State, Zipcode</p>
                <p>(area) phone-number</p>
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
