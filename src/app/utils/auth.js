export function getToken() {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export function isLoggedIn() {
    return !!getToken();
}