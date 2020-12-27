import jwtDecode from "jwt-decode";

export function getCurrentUser(jwt) {
    try {
        return jwtDecode(jwt);
    } catch (e) {
        return null;
    }
}
