import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';


function* editCardSaga(action) {
   try {
       yield call(axios.put, `/api/portfolio/edit/${action.payload.card}`, action.payload);
       yield put({type: 'GET_USER_PORTFOLIO', payload: action.payload.user});  
   }
   catch (error) {
       console.log(`PUT request to /api/portfolio/edit/${action.payload.card} UNSUCCESSFUL...`, error);
   }
}

function* editSaga() {
  yield takeLatest('UPDATE_CARD', editCardSaga);
}

export default editSaga;
