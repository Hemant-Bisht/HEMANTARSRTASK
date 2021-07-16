import { EMPLOYEE_LIST, ADD_NEW_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE } from '../constants/action-types';
import employeeData from '../../employeeData/data';

const initialValues = 
{
 employeeDataList : employeeData
};

export function employeeList(state = initialValues, action) {
    switch (action.type) {
        case EMPLOYEE_LIST: {
            console.log("action.payload",action.payload)
            return{
                 ...state,
                 employeeDataList : action.payload
             }
        }
        case ADD_NEW_EMPLOYEE: {
            const newArray = [...state.employeeDataList]; //Copying state array
            newArray.splice(0, 0, action.payload);
            //using splice to insert at an index
            return{
                 ...state,
                 employeeDataList : newArray
             }
        }
        case DELETE_EMPLOYEE: {
            console.log("action.payload",action.payload)
            const deleteResult = state.employeeDataList.filter(todo => todo.email !== action.payload)
            return{
                 ...state,
                 employeeDataList : deleteResult
             }
        }
        case EDIT_EMPLOYEE: {
            console.log("action.payload edit",action.payload)
            const index = state.employeeDataList.findIndex(x => x.email == action.payload.email); //finding index of the item
            console.log("index",index)
            const newArray = [...state.employeeDataList]; 
            newArray[index].email = action.payload.email 
            newArray[index].lastName = action.payload.lastName 
            newArray[index].name = action.payload.name 
            newArray[index].role = action.payload.role

            return{
                 ...state,
                 employeeDataList : newArray
             }
        }
        

        default:
            return state
    }
}