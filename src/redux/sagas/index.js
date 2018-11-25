import { all } from 'redux-saga/effects';
import loginLogoutSaga from './loginLogoutSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import portfolioSaga from './portfolioSaga';
import communitySaga from './communitySaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginLogoutSaga(),
    registrationSaga(),
    userSaga(),
    portfolioSaga(),
    communitySaga()
  ]);
}
