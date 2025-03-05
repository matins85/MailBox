import { User } from "./interface";
import { MBL_AUTH_TOKEN, MBL_USER } from "./label";

/**
 * Retrieves the authentication token from sessionStorage.
 * @returns {string | null} The token if it exists, otherwise null.
 */
export const getAuthToken = (): string | null => {
  return sessionStorage.getItem(MBL_AUTH_TOKEN);
};

/**
 * Sets the authentication token in sessionStorage.
 * @param {string} token - The token to store.
 */
export const setAuthToken = (token: string): void => {
  sessionStorage.setItem(MBL_AUTH_TOKEN, token);
};

/**
 * Removes the authentication token from sessionStorage.
 */
export const clearAuthToken = (): void => {
  sessionStorage.removeItem(MBL_AUTH_TOKEN);
  sessionStorage.removeItem(MBL_USER);
};

/**
 * Checks if the user is logged in by verifying the presence of a token.
 * @returns {boolean} True if a token exists, false otherwise.
 */
export const isLoggedIn = (): boolean => {
  return !!getAuthToken();
};

/**
 * Sets the user information in sessionStorage.
 * @param {string} item - The user's details.
 */
export const setStorageUser = (item: User): void => {
  sessionStorage.setItem(MBL_USER, JSON.stringify(item));
};

/**
 * Retrieves the user's information from sessionStorage.
 * @returns {User} The user's first and last name.
 */
export const getStorageUser = () => {
  const data = sessionStorage.getItem(MBL_USER);
  return data ? JSON.parse(data) : null;
};
