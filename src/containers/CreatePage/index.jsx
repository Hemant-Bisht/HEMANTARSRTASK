import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Redirect, withRouter } from "react-router-dom";
import {addNewEmployee} from "../../js/actions/employeeList";
import { useHistory } from "react-router-dom";


const validate = values => {
    const errors = {};
  
    if (!values.name) {
      errors.name = 'First Name is Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }
  
    if (!values.lastName) {
      errors.lastName = 'Last Name is Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }
  
    if (!values.email) {
      errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.role) {
        errors.role = 'Job Role is Required';
      } else if (values.lastName.length > 20) {
        errors.role = 'Must be 20 characters or less';
      }
  
    return errors;
  };

const CreatePage = ({employeeDataList, setAddUsers}) => {
  let history = useHistory();

  const redirectToHomePage = () => {
    history.push('/')
  }
    const formik = useFormik({
        initialValues: {
          name: '',
          lastName: '',
          email: '',
          role: '',
        },
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
          // employeeDataList.push(values)
          // console.log(employeeDataList,"result")
          await setAddUsers(values)
          alert('Add New User Details Successfully')
          
        },
      });
    return (
        <>
   <div className="container mt-4">
   <h1>Add User</h1>

   <form onSubmit={formik.handleSubmit}>
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
 
    
  
     
       {/* <button type="submit">Submit</button> */}
     </form>
   </div>
     
        </>
    );
};

// export default CreatePage;

const mapStateToProp = state =>{
  return{
      employeeDataList : state.employeeList.employeeDataList,
  }
}

const mapDispatchToProps = dispatch=>{
  return{
      setAddUsers : (addUser)=>dispatch(addNewEmployee(addUser)),
  }
}

export default connect(mapStateToProp, mapDispatchToProps) (CreatePage);


// export default compose(
//   withRouter, connect(mapStateToProp,mapDispatchToProps) )(CreatePage)