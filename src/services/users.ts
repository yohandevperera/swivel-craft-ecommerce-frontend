import { invoke } from "../utils/api-adapter";

/**
 *
 * Usage - This file will be used to communicate to the backend API endpoints
 *
 * Description - This file consists of all the API service call functions for the crafts resource
 *
 */

/**
 * Description - A global type thats used as
 * craft add payload and to fetch crafts as well
 */
export interface UserType {
  _id: string;
  firstname: string;
  email: string;
  phone: string;
  password: number;
}

/**
 * Description and Usage - This function will be used
 * to fetch all the crafts from the backend API endpoint
 */
export async function getAllUsers() {
  return invoke("api/users", "get", {});
}

/**
 * Description and Usage - This function will be used
 * to create an craft using the backend API endpoint
 *
 * @param craft @typedef Omit<UserType, "_id" | "photo">
 */
export async function createUser(craft: Omit<UserType, "_id">) {
  return invoke("api/users/", "post", craft);
}

/**
 * Description and Usage - This function will be used
 * to edit an craft using the backend API endpoint
 *
 * @param craft @typedef Omit<UserType, "_id" | "photo">
 * @param id @typedef string
 */
export async function editUser(craft: Omit<UserType, "_id">, id?: string) {
  return invoke(`api/users/${id}`, "patch", craft);
}

/**
 * Description and Usage - This function will be used
 * to remove an craft using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function deleteUser(id: string) {
  return invoke(`api/users/${id}`, "delete", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch a single craft for a given id using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getUser(id?: string) {
  return invoke(`api/users/${id}`, "get", {});
}

export async function searchUserByFristname(name?: string) {
  return invoke(`api/users/find-by-name/${name}`, "get", {});
}
