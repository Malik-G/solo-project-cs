import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* getPortfolioSaga(action) {
   try {
      const response = yield call(axios.get, `/api/portfolio/${action.payload}`);
      yield put({type: 'PORTFOLIO', payload: response.data});  
   }
   catch (error) {
       console.log(`GET request to /api/portfolio/${action.payload} UNSUCCESSFUL...`);
   }
}

function* addCardSaga(action) {
   try {
      yield call(axios.post, '/api/portfolio', action.payload);
      yield put({type: 'GET_USER_PORTFOLIO', payload: action.payload.user});
   }
   catch (error) {
      console.log(`POST request to /api/portfolio/${action.payload} UNSUCCESSFUL...`, error);
   }
}

function* deleteCardSaga(action) {
   try {
       yield call(axios.delete, `/api/portfolio/delete/?id=${action.payload.cardId}`);
       yield put({type: 'GET_USER_PORTFOLIO', payload: action.payload.user});  
   }
   catch (error) {
       console.log(`DELETE request to /api/portfolio/${action.payload.cardId} UNSUCCESSFUL...`, error);
   }
}

function* getUsernameSaga(action) {
   try {
      const response = yield call(axios.get, `/api/member-portfolio/${action.payload}`);
      yield put({type: 'MEMBER_USERNAME', payload: response.data});  
   }
   catch (error) {
       console.log(`GET request to /api/member-portfolio/${action.payload} UNSUCCESSFUL...`);
   }
}

function* portfolioSaga() {
  yield takeLatest('GET_USER_PORTFOLIO', getPortfolioSaga);
  yield takeLatest('ADD_CARD', addCardSaga);
  yield takeLatest('DELETE_CARD', deleteCardSaga);
  yield takeLatest('GET_USERNAME', getUsernameSaga);
}

export default portfolioSaga;
