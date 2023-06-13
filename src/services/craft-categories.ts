import { invoke } from "../utils/api-adapter";

/**
 *
 * Usage - This file will be used to communicate to the backend API endpoints
 *
 * Description - This file consists of all the API service call functions for the CraftCategorysCategories resource
 *
 */

/**
 * Description - A global type thats used as
 * CraftCategory add payload and to fetch CraftCategorysCategories as well
 */
export interface CraftCategoryType {
  _id: string;
  name: string;
}

/**
 * Description and Usage - This function will be used
 * to fetch all the CraftCategorysCategories from the backend API endpoint
 */
export async function getAllCraftCategories() {
  return invoke("api/craft-categories/", "get", {});
}

/**
 * Description and Usage - This function will be used
 * to create an CraftCategory using the backend API endpoint
 *
 * @param CraftCategory @typedef Omit<CraftCategoryType, "_id" | "photo">
 */
export async function createCraftCategory(
  craftCategory: Omit<CraftCategoryType, "_id">
) {
  return invoke("api/craft-categories/", "post", craftCategory);
}

/**
 * Description and Usage - This function will be used
 * to edit an CraftCategory using the backend API endpoint
 *
 * @param CraftCategory @typedef Omit<CraftCategoryType, "_id" | "photo">
 * @param id @typedef string
 */
export async function editCraftCategory(
  craftCategory: Omit<CraftCategoryType, "_id" | "photo">,
  id?: string
) {
  return invoke(`api/craft-categories${id}`, "patch", craftCategory);
}

/**
 * Description and Usage - This function will be used
 * to remove an CraftCategory using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function deleteCraftCategory(id: string) {
  return invoke(`api/craft-categories/${id}`, "delete", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch a single CraftCategory for a given id using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getCraftCategory(id?: string) {
  return invoke(`api/craft-categories/get-craft-category/${id}`, "get", {});
}

/**
 * Description and Usage - This function will be used
 * to search a single CraftCategory for a given name using the backend API endpoint
 *
 * @param name @typedef string
 */
export async function searchCraftCategoryByName(name?: string) {
  return invoke(`api/craft-categories/find-by-name/${name}`, "get", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch all CraftCategory names using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getCraftCategoriesByName() {
  return invoke(`api/craft-categories/get-category-by-name`, "get", {});
}
