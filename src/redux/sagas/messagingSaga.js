import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* getInboxSaga(action) {
   try {
      console.log('IN getInbox SAGA...') ;
      const response = yield call(axios.get, `/api/messages`);
      yield put({type: 'INBOX', payload: response.data});  
   }
   catch (error) {
       console.log('GET request to /api/community UNSUCCESSFUL...');
   }
 }

function* communitySaga() {
  yield takeLatest('GET_INBOX', getInboxSaga);
}

export default communitySaga;