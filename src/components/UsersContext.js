import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const initialState = {
    users: {
        loading: false,
        data: null,
        error: null
    },
    user: {
        loading: false,
        data: null,
        error: null
    }
};

const loadingState = {
    loading: true,
    data: null,
    error: null
};

const success = data => ({
    loading: false,
    data: data,
    error: null
});

const error = error => ({
    loading: false,
    data: null,
    error: error
});

function reducer(state, action) {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: loadingState
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: success(action.data)
            };
        case 'GET_USERS_ERROR':
            return {
                ...state,
                users: error(action.error)
            };
        case 'GET_USER':
            return {
                ...state,
                user: loadingState
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: success(action.data)
            };
        case 'GET_USER_ERROR':
            return {
                ...state,
                user: error(action.error)
            };
        default:
            throw new Error(`unHandled actiont type ${action.type}`);
    }
}

const usersStateContext = createContext(null);
const usersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <usersDispatchContext.Provider value={dispatch}>
            <usersStateContext.Provider value={state}>
                {children}
            </usersStateContext.Provider>
        </usersDispatchContext.Provider>
    );
}

export function useUsersState() {
    const state = useContext(usersStateContext);
    if (!state) {
        throw new Error('Cannot find usersStateContext.Provider');
    }
    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(usersDispatchContext);
    if (!dispatch) {
        throw new Error('Cannot find usersDispatchContext.Provider');
    }
    return dispatch;
}

export async function getUsers(dispatch) {
    dispatch({ type: 'GET_USERS' });
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
        );
        dispatch({ type: 'GET_USERS_SUCCESS', data: response.data });
    } catch (e) {
        dispatch({ type: 'GET_USERS_ERROR', error: e });
    }
}

export async function getUser(dispatch, id) {
    dispatch({ type: 'GET_USER' });
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        dispatch({ type: 'GET_USER_SUCCESS', data: response.data });
    } catch (e) {
        dispatch({ type: 'GET_USER_ERROR', error: e });
    }
}
