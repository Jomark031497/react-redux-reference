const initialState = {
    loading: false,
    users: [],
    error: ""
};

const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');


const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
};

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
};

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }

        default:
            return state
    }
}

const fetchUsers =  () => {
    return async(dispatch) => {
        try {
            dispatch(fetchUsersRequest);
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch(fetchUsersSuccess(res.data.map(user => user.id)));
        } catch (err) {
            dispatch(fetchUsersFailure(err.message))
        }
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUsers());
