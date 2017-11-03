import React       from 'react'
import { connect } from 'react-redux'
import moment      from 'moment'
import { Divider } from 'material-ui'

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
        <header className="">
          <h1 className="text-center header-title">INVOICE</h1>
        </header>
        <article className="row">
          <div className="left-block invoice-no col">
            <div className="invoice row">
              <p className="col">Invoice #: </p>
              <p className="col text-right" contentEditable suppressContentEditableWarning>00</p>
            </div>
            <div className="date row">
              <p className="col">Date: </p>
              <p className="col text-right">{moment().format("MM-DD-YYYY")}</p>
            </div>
            <Divider />
          </div>
          <div className="col right-block text-right">
            <span className="user-logo">
              <img alt="" src={this.state.logo} />
              <input type="file" accept="image/*" onChange={this.imgUploaded} />
            </span>
            <address contentEditable suppressContentEditableWarning>
              <p>CompuExpress US, LLC.</p>
              <p>7655 Lone Shepherd Dr.<br />Las Vegas, NV 89166</p>
              <p>(702) 514-0607</p>
              <p>http://compuexpress.us</p>
            </address>
          </div>
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.User
})


export default connect(mapStateToProps, null)(Home)