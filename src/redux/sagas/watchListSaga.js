import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* getWatchListSaga(action) {
   try {
      const response = yield call(axios.get, `/api/watch-list/${action.payload}`);
      yield put({type: 'WATCH_LIST', payload: response.data});  
   }
   catch (error) {
       console.log(`GET request to /api/watch-list/${action.payload} UNSUCCESSFUL...`, error);
   }
}
function* watchListSaga () {
   yield takeLatest('GET_WATCH_LIST', getWatchListSaga);
}

export default watchListSaga