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
export interface CraftType {
  _id: string;
  name: string;
  categoryId: string;
  description: string;
  qty: number;
  price: number;
  photo: any;
}

/**
 * Description and Usage - This function will be used
 * to fetch all the crafts from the backend API endpoint
 */
export async function getAllCrafts() {
  return invoke("api/crafts/", "get", {});
}

/**
 * Description and Usage - This function will be used
 * to create an craft using the backend API endpoint
 *
 * @param craft @typedef Omit<CraftType, "_id" | "photo">
 */
export async function createCraft(craft: Omit<CraftType, "_id" | "photo">) {
  return invoke("api/crafts/", "post", craft);
}

/**
 * Description and Usage - This function will be used
 * to edit an craft using the backend API endpoint
 *
 * @param craft @typedef Omit<CraftType, "_id" | "photo">
 * @param id @typedef string
 */
export async function editCraft(
  craft: Omit<CraftType, "_id" | "photo">,
  id?: string
) {
  return invoke(`api/crafts/${id}`, "patch", craft);
}

/**
 * Description and Usage - This function will be used
 * to remove an craft using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function deleteCraft(id: string) {
  return invoke(`api/crafts/${id}`, "delete", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch a single craft for a given id using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getCraft(id?: string) {
  return invoke(`api/crafts/${id}`, "get", {});
}
