import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Redirect, withRouter } from "react-router-dom";
import {editEmployee} from "../../js/actions/employeeList";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";



const CreatePage = ({employeeDataList, setEditUsers}) => {
  const [editUserInfo, setEditUserInfo] = useState('');
  let history = useHistory();

  const redirectToHomePage = () => {
    history.push('/')
  }

  const getSelectedUserInfo = async () => {
    let urlStr = window.location.pathname;
    let urlName = urlStr.split("/").pop();
    let selectedData = employeeDataList.filter(item=>item.email===urlName);
    await setEditUserInfo(selectedData[0])
  }

  useEffect(()=>{
    setTimeout(function(){ getSelectedUserInfo(); }, 2000);
  })

    const formik = useFormik({
        initialValues: {
          name: editUserInfo.name,
          lastName: editUserInfo.lastName,
          email:  editUserInfo.email,
          role:  editUserInfo.role,
        },
        enableReinitialize : true,
        validationSchema: Yup.object({
            name: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('First Name is Required'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Last Name is Required'),
            email: Yup.string().email('Invalid email address').required('Email is Required'),
            role: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Job Role is Required'),
          }),
        onSubmit: async (values) => {
          // alert(JSON.stringify(values, null, 2));
          setEditUsers(values)
          alert('Edit User Details Successfully')
        },
      });
    return (
        <>
        {
            editUserInfo !== '' ? <><div className="container mt-4">
            <h1>Edit User</h1>
         
            <form onSubmit={formik.handleSubmit} >
               <div className="row">
                     <div className="col-md-6 p-2">
                     <label htmlFor="name" style={{ display: "block" }}>First Name</label>
                     <input
                         className="w-100"
                         id="name"
                         name="name"
                         type="text"
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.name}
                     />
                     {formik.touched.name && formik.errors.name ? (
                         <div style={{ color: "red" }}>{formik.errors.name}</div>
                     ) : null}
                     </div>
                     <div className="col-md-6 p-2">
                     <label htmlFor="lastName" style={{ display: "block" }}>Last Name</label>
                     <input
                         className="w-100"
                         id="lastName"
                         name="lastName"
                         type="text"
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.lastName}
                     />
                     {formik.touched.lastName && formik.errors.lastName ? (
                         <div style={{ color: "red" }}>{formik.errors.lastName}</div>
                     ) : null}
                     </div>
               </div>
               <div className="row">
                   <div className="col-md-6 p-2">
                   <label htmlFor="email" style={{ display: "block" }}>Email Address</label>
                     <input
                         id="email"
                         className="w-100"
                         name="email"
                         type="email"
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.email}
                     />
                     {formik.touched.email && formik.errors.email ? (
                         <div style={{ color: "red" }}>{formik.errors.email}</div>
                     ) : null}
                   </div>
         
                   <div className="col-md-6 p-2">
                   <label htmlFor="role" style={{ display: "block" }}>Job Role</label>
                     <input
                         id="role"
                         className="w-100"
                         name="role"
                         type="text"
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.role}
         
                     />
                     {formik.touched.role && formik.errors.role ? (
                         <div style={{ color: "red" }}>{formik.errors.role}</div>
                     ) : null}
                   </div>
         
               </div>
               <div className="row">
               <div className='col-md-12 pl-2 pt-4'>
                <button className="btn btn-sm btn-primary mr-1" type="submit">Submit</button>
                <button className="btn btn-sm btn-primary mr-1" onClick={redirectToHomePage}>HomePage</button>
         
              </div>
              </div>
          
         
              </form>
            </div></> : <div style={{width: "100%", height: "100", display: "flex",justifyContent: "center",  alignItems: "center"}} ><Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        // timeout={3000} 
      /></div>
        }
   
     
        </>
    );
};



const mapStateToProp = state =>{
  return{
      employeeDataList : state.employeeList.employeeDataList,
  }
}

const mapDispatchToProps = dispatch=>{
  return{
      setEditUsers : (editUser)=>dispatch(editEmployee(editUser)),
  }
}

export default connect(mapStateToProp, mapDispatchToProps) (CreatePage);


