import { EMPLOYEE_LIST, ADD_NEW_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE } from '../constants/action-types';

export function employeeList(payload) {
    return { type: EMPLOYEE_LIST, payload };
}

export function addNewEmployee(payload) {
    return { type: ADD_NEW_EMPLOYEE, payload };
}

export function deleteEmployee(payload) {
    return { type: DELETE_EMPLOYEE, payload };
}
export function editEmployee(payload) {
    return { type: EDIT_EMPLOYEE, payload };
}




