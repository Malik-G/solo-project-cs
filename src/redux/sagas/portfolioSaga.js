import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

function* getPortfolio(action) {
   try {
      console.log('IN getPortfolio SAGA...') ;
      const response = yield call(axios.get, `/api/portfolio/${action.payload}`);
      yield put({type: 'PORTFOLIO', payload: response.data});  
   }
   catch (error) {
       console.log(`GET request to /api/portfolios/${action.payload} UNSUCCESSFUL...`);
   }
}

function* portfolioSaga() {
  yield takeLatest('GET_USER_PORTFOLIO', getPortfolio);
}

export default portfolioSaga;
