import React, { createContext, useReducer, useContext } from 'react';
import {
    createAsyncDispatcher,
    createAsyncHandler,
    initialAsyncState
} from './asyncActionUtils';
import * as api from './api';

const usersHandler = createAsyncHandler('GET_USERS', 'users');
const userHandler = createAsyncHandler('GET_USER', 'user');

const initialState = {
    users: initialAsyncState,
    user: initialAsyncState
};
function reducer(state, action) {
    console.log(action);
    switch (action.type) {
        case 'GET_USERS':
        case 'GET_USERS_SUCCESS':
        case 'GET_USERS_ERROR':
            console.log(usersHandler(state, action));
            return usersHandler(state, action);
        case 'GET_USER':
        case 'GET_USER_SUCCESS':
        case 'GET_USER_ERROR':
            console.log('?');
            return userHandler(state, action);
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

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);
