import { invoke } from "../utils/api-adapter";

/**
 *
 * Usage - This file will be used to communicate to the backend API endpoints
 *
 * Description - This file consists of all the API service call functions for the Orders resource
 *
 */

/**
 * Description - A global type thats used as
 * Order add payload and to fetch Orders as well
 */
export interface OrderType {
  _id: string;
  orderId: string;
  userId: string;
  totalPrice: number;
  qtyBought: number;
  craftId: string;
}

/**
 * Description - A global type thats used as
 * OrderTableType fetch Orders needed for the order table
 */
export interface OrderTableType {
  orderId: string;
  _id: string;
  email: string;
  totalPrice: number;
  itemCount: number;
}

/**
 * Description - A global type thats used as
 * OrderMoreInfoType fetch Orders needed for the order more info table
 */
export interface OrderMoreInfoType {
  orderId: string;
  itemName: string;
  itemPrice: number;
}

/**
 * Description and Usage - This function will be used
 * to fetch all the Orders from the backend API endpoint
 */
export async function getAllOrders() {
  return invoke("api/orders/", "get", {});
}

/**
 * Description and Usage - This function will be used
 * to create an Order using the backend API endpoint
 *
 * @param Order @typedef Omit<OrderType, "_id" | "photo">
 */
export async function createOrder(Order: Omit<OrderType, "_id">[]) {
  return invoke("api/orders/", "post", Order);
}

/**
 * Description and Usage - This function will be used
 * to fetch a single Order for a given id using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getOrder(id?: string) {
  return invoke(`api/orders/get-order/${id}`, "get", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch a single Order for a given id using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getOrderTableData(id?: string) {
  return invoke(`api/orders/get-orders`, "get", {});
}

/**
 * Description and Usage - This function will be used
 * to fetch a total sales using the backend API endpoint
 *
 * */
export async function getTotalSales() {
  return invoke(`api/orders/get-total-sales`, "get", {});
}


/**
 * Description and Usage - This function will be used
 * to fetch  top sales using the backend API endpoint
 *
 * @param id @typedef string
 */
export async function getTopSales() {
  return invoke(`api/orders/get-top-sales`, "get", {});
}
