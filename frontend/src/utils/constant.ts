export const HOST =  import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";

export const USER_BASE_ROUTE = "api";

export const USER_ROUTE = `${USER_BASE_ROUTE}/user`;

export const GET_USER_ROUTE = `${USER_BASE_ROUTE}/users`;

export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;

export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

