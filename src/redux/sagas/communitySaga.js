import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* getCommunitySaga(action) {
   try {
      console.log('IN getCommunity SAGA...') ;
      const response = yield call(axios.get, `/api/community`);
      yield put({type: 'COMMUNITY', payload: response.data});  
   }
   catch (error) {
       console.log('GET request to /api/community UNSUCCESSFUL...');
   }
 }

function* communitySaga() {
  yield takeLatest('GET_COMMUNITY', getCommunitySaga);
}

export default communitySaga;