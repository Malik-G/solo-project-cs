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

function* updateWatchListSaga(action) {
   try {
      yield call(axios.post, '/api/watch-list/update', action.payload);
      yield put({type: 'GET_WATCH_LIST', payload: action.payload.watch_list_owner});
   }
   catch (error) {
      console.log(`POST request to /api/portfolio/${action.payload} UNSUCCESSFUL...`, error);
   }
}

function* removeWatchItemSaga(action) {
   try {
       yield call(axios.delete, `/api/watch-list/delete/?id=${action.payload.watch_list_id}`);
       yield put({type: 'GET_WATCH_LIST', payload: action.payload.watch_list_owner}); 
   }
   catch (error) {
       console.log(`DELETE request to /api/watch-list/delete/?id=${action.payload.watch_list_owner} UNSUCCESSFUL...`, error);
   }
}

function* watchListSaga () {
   yield takeLatest('GET_WATCH_LIST', getWatchListSaga);
   yield takeLatest('UPDATE_WATCH_LIST', updateWatchListSaga);
   yield takeLatest('REMOVE_WATCH_LIST_ITEM', removeWatchItemSaga);
}

export default watchListSaga