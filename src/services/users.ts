import { invoke } from "../utils/api-adapter";

/**
 *
 * Usage - This file will be used to communicate to the backend API endpoints
 *
 * Description - This file consists of all the API service call functions for the users resource
 *
 */

/**
 * Description - A global type thats used as
 * user add payload and to fetch user as well
 */
export interface UserType {
  _id: string;
  firstname: string;
  email: string;
  phone: string;
  password: number;
  userRole: "ADMIN" | "USER";
}

/**
 * Description - A global type thats used as
 * auth type to validate the user
 */
export interface AuthType {
  email: string;
  password: string;
}

/**
 * Description and Usage - This function will be used
 * to fetch all the users from the backend API endpoint
 */
export async function getAllUsers() {
  return invoke("api/users", "get", {});
}

/**
 * Description and Usage - This function will be used
 * to create an user using the backend API endpoint
 *
 * @param user @typedef Omit<UserType, "_id" | "photo">
 */
export async function createUser(user: Omit<UserType, "_id">) {
  return invoke("api/users/", "post", user);
}

/**
 * Description and Usage - This function will be used
 * to edit an user using the backend API endpoint
 *
 * @param user @typedef Omit<UserType, "_id" | "photo">
 * @param id @typedef string
 */
export async function editUser(user: Omit<UserType, "_id">, id?: string) {
  return invoke(`api/users/${id}`, "patch", user);
}

/**
 * Description and Usage - This function will be used
 * to remove an user using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function deleteUser(id: string) {
  return invoke(`api/users/${id}`, "delete", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch a single user for a given id using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getUser(id?: string) {
  return invoke(`api/users/${id}`, "get", {});
}

/**
 * Description and Usage - This function will be used
 * to search a single user for a given firstname using the backend API endpoint
 *
 * @param name @typedef string
 */
export async function searchUserByFristname(name?: string) {
  return invoke(`api/users/find-by-name/${name}`, "get", {});
}


/**
 * Description and Usage - This function will be used
 * to validate a single user for a given authDetails using the backend API endpoint
 *
 * @param loginParams @typedef AuthType
 */
export async function validateUser(loginParams?: AuthType) {
  return invoke(`api/users/login`, "post", loginParams);
}
