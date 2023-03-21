import { invoke } from "../utils/api-adapter";

/**
 *
 * Usage - This file will be used to communicate to the backend API endpoints
 *
 * Description - This file consists of all the API service call functions
 *
 */

/**
 * Description - A global type thats used as
 * employee add payload and to fetch employees as well
 */
export interface EmployeeType {
  _id: string;
  photo: any;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: "M" | "F" | "Male" | "Female" | string;
}

/**
 * Description and Usage - This function will be used
 * to fetch all the employees from the backend API endpoint
 */
export async function getAllEmployees() {
  return invoke("api/employees/", "get", {});
}

/**
 * Description and Usage - This function will be used
 * to create an employee using the backend API endpoint
 *
 * @param employee @typedef Omit<EmployeeType, "_id" | "photo">
 */
export async function createEmployee(
  employee: Omit<EmployeeType, "_id" | "photo">
) {
  return invoke("api/employees/", "post", employee);
}

/**
 * Description and Usage - This function will be used
 * to edit an employee using the backend API endpoint
 *
 * @param employee @typedef Omit<EmployeeType, "_id" | "photo">
 * @param id @typedef string
 */
export async function editEmployee(
  employee: Omit<EmployeeType, "_id" | "photo">,
  id?: string
) {
  return invoke(`api/employees/${id}`, "patch", employee);
}

/**
 * Description and Usage - This function will be used
 * to remove an employee using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function deleteEmployee(id: string) {
  return invoke(`api/employees/${id}`, "delete", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch a single employee for a given id using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getEmployee(id?: string) {
  return invoke(`api/employees/${id}`, "get", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch a single employee for a given firstname using the backend API endpoint
 *
 * @param firstname @typedef string
 */
export async function searchEmployeeByFirstname(firstname?: string) {
  return invoke(`api/employees/find-by-name/${firstname}`, "get", {});
}

/**
 * Description and Usage - This function will be used
 * to sort all employees by the id by either ascending or descending 
 * order using the backend API endpoint
 *
 * @param type @typedef enum
 */
export async function sortEmployees(type?: "asc" | "desc") {
  return invoke(`api/employees/sort-employees/${type}`, "get", {});
}
