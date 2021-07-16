import React, { Component } from 'react';
// import employeeData from '../../employeeData/data';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from 'redux';

class ReadPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selectedUserInfo : ''
        }
    }

    getSelectedUserInfo = () => {
      let urlStr = window.location.pathname;
      let urlName = urlStr.split("/").pop();
      let selectedData = this.props.employeeDataList.filter(item=>item.email===urlName);
      console.log(selectedData,"selectedData");
      this.setState({selectedUserInfo : selectedData[0]})

    }

    componentDidMount(){
      this.getSelectedUserInfo();
    }

    redirectToHomePage = () => {
      this.props.history.push('/');
    }
    
    render() {
        const { selectedUserInfo } = this.state;
        return (
            <>
            <div className="container">
            <div class="wrapper">
    <div class="left">
         {/* <img src="https://i.imgur.com/cMy8V5j.png" alt="user" width="100" />  */}
        <h2>{selectedUserInfo.name}</h2>
         <h4>{selectedUserInfo.role}</h4>
    </div>
    <div class="right">
        <div class="info">
            <h3>Information</h3>
            <div class="info_data">
                 <div class="data">
                    <h4>Email</h4>
                    <p>{selectedUserInfo.email}</p>
                 </div>
            </div>
        </div>
      
      <div class="projects">
            <h3>Projects</h3>
            <div class="projects_data">
                 <div class="data">
                    <h4>First Name</h4>
                    <p>{selectedUserInfo.name}</p>
                 </div>
                 <div class="data">
                   <h4>Last Name</h4>
                    <p>{selectedUserInfo.lastName}</p>
              </div>
            </div>
        </div>
<button className="btn btn-sm btn-primary mr-1" onClick={this.redirectToHomePage}>HomePage</button>
        

    </div>
</div>
            </div>
          
            </>
        );
    }
}

// export default withRouter(ReadPage);

const mapStateToProp = state =>{
  return{
      employeeDataList : state.employeeList.employeeDataList,
  }
}



// export default withRouter(HomePage);

export default compose(
  withRouter, connect(mapStateToProp,null) )(ReadPage)