import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';


function* updateTradeBlockSaga(action) {
   try {
       yield call(axios.put, `/api/trade-block`, action.payload);
       yield put({type: 'GET_USER_PORTFOLIO', payload: action.payload.user});  
   }
   catch (error) {
       console.log(`PUT request to /api/trade-block UNSUCCESSFUL...`, error);
   }
}

// function* removeFromTbSaga(action) {
//    try {
//        yield call(axios.put, `/api/trade-block`, action.payload);
//        yield put({type: 'GET_USER_PORTFOLIO', payload: action.payload.user});  
//    }
//    catch (error) {
//        console.log(`PUT request to /api/portfolio/edit/${action.payload.card} UNSUCCESSFUL...`, error);
//    }
// }

function* tradeBlockSaga() {
  yield takeLatest('UPDATE_TRADE_BLOCK', updateTradeBlockSaga);
  //yield takeLatest('REMOVE_FROM_TRADE_BLOCK', removeFromTbSaga);
}

export default tradeBlockSaga;