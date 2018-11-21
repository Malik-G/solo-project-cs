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

function* getAllPortfolios(action) {
   try {
      console.log('IN getAllPortfolios SAGA...') ;
      const response = yield call(axios.get, `/api/portfolio/`);
      yield put({type: 'ALL_PORTFOLIOS', payload: response.data});  
   }
   catch (error) {
       console.log('GET request to /api/portfolios UNSUCCESSFUL...');
   }
 }

function* portfolioSaga() {
  yield takeLatest('GET_USER_PORTFOLIO', getPortfolio);
  yield takeLatest('GET_ALL_PORTFOLIOS', getAllPortfolios);
}

export default portfolioSaga;
