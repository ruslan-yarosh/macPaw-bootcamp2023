import { RequestMethod } from "../types/RequestMethod";

/* eslint-disable @typescript-eslint/no-explicit-any */
const API_KEY = '018317f4-74a5-4a08-aa39-ce04f764943a';
const BASE_URL = 'https://api.thecatapi.com/v1/';

const headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

const uploadHeaders = {
  "Content-Type": "multipart/form-data",
  "x-api-key": API_KEY,
}

export const request = async <T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(BASE_URL + url, options);

    return res.json();
  } catch {
    throw new Error;
  }
}

export const upload = async (
  url: string,
  data: any,
) => {
  const options: RequestInit = {
    method: 'POST',
    headers: uploadHeaders,
  };

  options.body = data;

  try {
    const res = await fetch(BASE_URL + url, options);

    return res.json();
  } catch {
    throw new Error;
  }
}