import { fork, call, take, put, cancel } from 'redux-saga/effects'
import authenticateProvider from './providers/firebase';
import apiProvider from 'services/api/providers/firebase';

const LOGIN_REQUEST = 'login request';
const CHECK_USER_SESSION_REQUEST = 'check user session request';
const CHECK_USER_SESSION_FAILED = 'user is not logged in';
const LOGIN_SUCCESS = 'login success';
const LOGIN_ERROR = 'login error';
const LOGOUT = 'log out';
const REQUEST_ROLES = 'request user roles';
const REQUEST_ROLES_SUCCESS = 'request user roles succcess';

const checkUserSession = () => ({
    type: CHECK_USER_SESSION_REQUEST
});

const checkUserSessionFailed = () => ({
    type: CHECK_USER_SESSION_FAILED
})

const logIn = (email, password) => ({
    type: LOGIN_REQUEST,
    payload: {
        email,
        password
    }
});

const logOut = () => ({
    type: LOGOUT
});

const logInSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: {
        user
    }
});

const logInError = (error) => ({
    type: LOGIN_ERROR,
    payload: {
        error
    }
});

const requestRoles = () => ({
    type: REQUEST_ROLES
})

const requestRolesSuccess = (roles) => ({
    type: REQUEST_ROLES_SUCCESS,
    payload: { roles }
})

function* getUserRoles(uid) {
    yield put(requestRoles());
    const roles = yield call(apiProvider.getUserRoles, uid);
    yield put(requestRolesSuccess(roles));
}

function* authorize(email, password) {
    try {
        const user = yield call(authenticateProvider.doLoginWithEmailAndPassword, email, password);
        yield put(logInSuccess(user));
        yield call(getUserRoles, user.uid);
    } catch(error) {
        yield put(logInError(error))
    }
  }

  function* loginFlow() {
    while (true) {
        yield take(CHECK_USER_SESSION_REQUEST);
        const user = yield call(authenticateProvider.checkLoginSession);
        let loginTask = null;
        if (user) {
            yield put(logInSuccess(user));
            yield call(getUserRoles, user.uid);
        } else {
            yield put(checkUserSessionFailed());
            const request = yield take(LOGIN_REQUEST)
            const { email, password } = request.payload;
            loginTask = yield fork(authorize, email, password);
        }

        const action = yield take([LOGOUT, LOGIN_ERROR]);
        if (action.type === LOGIN_ERROR && loginTask) {
            yield cancel(loginTask);
        }

        yield call(authenticateProvider.doSignOut);
    }
  }


const authenticateReducer = (state = {}, action) => {
    switch (action.type) {
        case CHECK_USER_SESSION_REQUEST:
            return {
                checkingSession: true
            }

        case CHECK_USER_SESSION_FAILED:
            return {}

        case LOGIN_REQUEST:
            return {
                loggingIn: true
            }

        case LOGIN_SUCCESS:
            return {
                loggingIn: false,
                user: action.payload.user
            };

        case REQUEST_ROLES:
            return {
                ...state,
                gettingUserRoles: true
            }

        case REQUEST_ROLES_SUCCESS: {
            return {
                ...state,
                gettingUserRoles: false,
                roles: action.payload.roles
            }
        }

        case LOGIN_ERROR:
            return {
                loggingIn: true,
                error: action.payload.error
            }

        case LOGOUT:
            return {}

        default:
            return state;
    }
}

export {
    checkUserSession,
    logIn,
    logInSuccess,
    logInError,
    logOut,
    loginFlow
}

export default authenticateReducer;
