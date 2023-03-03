import { invoke } from "../utils/api-adapter";

export interface EmployeeType {
  _id: string;
  photo: any;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: "M" | "F" | "Male" | "Female" | string;
}

export async function getAllEmployees() {
  return invoke("api/employees/", "get", {});
}

export async function createEmployee(
  employee: Omit<EmployeeType, "_id" | "photo">
) {
  return invoke("api/employees/", "post", employee);
}

export async function editEmployee(
  employee: Omit<EmployeeType, "_id" | "photo">,
  id?: string,
) {
  return invoke(`api/employees/${id}`, "put", employee);
}

export async function deleteEmployee(id: string) {
  return invoke(`api/employees/${id}`, "delete", {});
}

export async function getEmployee(id?: string) {
  return invoke(`api/employees/${id}`, "get", {});
}
