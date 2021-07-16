import React, { Component } from 'react';
// import employeeData from '../../employeeData/data';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {deleteEmployee} from "../../js/actions/employeeList";


class HomePage extends Component {
     constructor(props) {
         super(props)
         this.state = { 
            paginate: 1,
            totalItemsCount: '',
            pageRangeDisplayed: '', 
            activeEmployeeList : '',
            activeEmployeeListSave : '',
         }
     }
     
    getActivePageEmployee = () => {
        const indexOfLastTodo = this.state.paginate * 9;
        const indexOfFirstTodo = indexOfLastTodo - 9;
        const currentTodos = this.props.employeeDataList.slice(indexOfFirstTodo, indexOfLastTodo);

        this.setState({
            activeEmployeeList : currentTodos,
            activeEmployeeListSave : currentTodos
        })
    } 

    componentDidMount(){
        // console.log("employeeData",employeeData)
        this.getActivePageEmployee();
        let total_records = this.props.employeeDataList.length;
        const pageRange = total_records / 9;
        let range =Math.ceil(pageRange);
        this.setState({
            totalItemsCount : total_records,
            pageRangeDisplayed: range
        })
    }

    
   handlePageChange(pageNumber) {
    this.setState({paginate: pageNumber},()=>{
    this.getActivePageEmployee();
   });
   }

 searchChange = (event) => {
   let searchInput = event.target.value;
   const searchResult = this.state.activeEmployeeListSave.filter(item=>item?.name?.toLowerCase().includes(searchInput.toLowerCase()))
   if(searchResult.length > 0){
       this.setState({
        activeEmployeeList : searchResult
       })
   }
   if(searchInput === ''){
    this.setState({
        activeEmployeeList : this.state.activeEmployeeListSave
       })
   }
 }

 handleDelete = (userDelete) => {
     swal({
        title: "Are you sure?",
        text: "Delete the employee information",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            const {activeEmployeeList} = this.state;
            const result = activeEmployeeList.filter(item=>item.email !== userDelete)
            this.setState({activeEmployeeList : result})
            this.props.setDeleteUser(userDelete);
        } else {
          swal("Employee Info is not deleted!");
        }
    });
 }

 handleRead = (userRead) => {
    this.props.history.push(`/read-info/${userRead}`);
 }
 handleAddEmployee = () => {
    this.props.history.push('/add-employee');
 }
 handleEdit = (userEdit) => {
    this.props.history.push(`/edit-info/${userEdit}`);
 }

    render() {
        const {activeEmployeeList} = this.state;
        return (
            <div className="container">
                 <div>
                 <div class="d-flex bd-highlight">
                <div class="p-2 w-100 bd-highlight pl-0"><h3>Employee List</h3></div>
                <div class="p-2 flex-shrink-1 bd-highlight"> Search :  <input type="text" onChange={this.searchChange} /></div>
                </div>
            <button className="btn btn-sm btn-success mb-2" onClick={this.handleAddEmployee}>Add an Employee</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {activeEmployeeList && activeEmployeeList.map(user =>
                        <tr key={user.email}>
                            <td>{user.name} </td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button className="btn btn-sm btn-info mr-1" onClick={()=>this.handleRead(user.email)}>Read</button>
                                <button className="btn btn-sm btn-primary mr-1"  onClick={()=>this.handleEdit(user.email)}>Edit</button>
                                <button  className="btn btn-sm btn-danger btn-delete-user" onClick={()=>this.handleDelete(user.email)}>
                                   Delete
                                </button>
                            </td>
                        </tr>
                    )}
                    {!activeEmployeeList &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {activeEmployeeList && !activeEmployeeList.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No activeEmployeeList To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
              
             
                    <Pagination
                      itemClass="page-item"
                      linkClass="page-link"
                      activePage={this.state.paginate}
                      itemsCountPerPage={9}
                      totalItemsCount={this.state.totalItemsCount}
                      pageRangeDisplayed={this.state.pageRangeDisplayed}
                      onChange={this.handlePageChange.bind(this)}
                    />
            </div>
        );
    }
}

const mapStateToProp = state =>{
    return{
        employeeDataList : state.employeeList.employeeDataList,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        setDeleteUser : (deleteUser)=>dispatch(deleteEmployee(deleteUser)),
    }
  }
  

// export default withRouter(HomePage);

export default compose(
    withRouter, connect(mapStateToProp,mapDispatchToProps) )(HomePage)