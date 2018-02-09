import { FETCH_USERS, FETCH_CURRENT_USER } from './actionTypes';

export const fetchUsers = () => async (dispatch, getState, axiosInstance) => {
    const fetchUsersURL = '/users';
    const res = await axiosInstance.get(fetchUsersURL);

    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};

export const fetchCurrentUser = () => async (dispatch, getState, axiosInstance) => {
    const fetchCurrentUserURL = '/current_user';
    const res = await axiosInstance.get(fetchCurrentUserURL);

    dispatch({
        type: FETCH_CURRENT_USER,
        payload: res
    })
};
