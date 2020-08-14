import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "./userTypes";
import axios from "axios";

export const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

export const fetchUsers = () => {
    return async (dispatch) => {

        try {
            dispatch(fetchUserRequest);
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch(fetchUserSuccess(res.data));
        } catch (err) {
            dispatch(fetchUsersFailure(err.message))
        }

    }
}