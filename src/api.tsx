import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
})

// const BASE_URL = "http://127.0.0.1:8000/api/v1"
// export async function getRooms() {
//     const response = await fetch(`${BASE_URL}/rooms/`)
//     const json = await response.json();
//     return json;
// }

export const getRooms = () => instance.get("rooms/").then((response) => response.data)
export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, roonPk] = queryKey
    return instance.get(`rooms/${roonPk}`).then((response) => response.data)
}

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roonPk] = queryKey
    return instance.get(`rooms/${roonPk}/reviews`).then((response) => response.data)
}


export const getMe = () => instance.get(`users/me`).then((response)=> response.data)

export const logOut = () => instance.post(`users/log-out`, null, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || ""
    },
}).then(response => response.data)

export const githubLogIn = (code: string) => instance.post(`/users/github`, { code }, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || ""
    },
}).then(response => response.status)