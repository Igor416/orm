import { Choices, Sale } from "./JSONTypes";
//import Cookies from 'js-cookie'

export function getUser(): Promise<string> {
  const url = '/user/';
  return sendGetRequest<string>(url);
}

export function getChoices(): Promise<Choices> {
  const url = '/choices/';
  return sendGetRequest<Choices>(url);
}

export function postSale(sale: Sale): Promise<Sale> {
  const url = '/sale/';
  return sendPostRequest<Sale>(url, sale);
}

export function getSales(): Promise<Sale[]> {
  const url = '/sales/';
  return sendGetRequest<Sale[]>(url);
}

export function getSale(id: number): Promise<Sale> {
  const url = '/sale/' + id;
  return sendGetRequest<Sale>(url);
}

async function sendGetRequest<T>(path: string): Promise<T> {
  const response = await fetch('/api' + path);
  return await response.json();
}

async function sendPostRequest<T>(path: string, body: T): Promise<T> {
  let options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(body)
  }
  const response = await fetch('/api' + path, options);
  return await response.json();
}