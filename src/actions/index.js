import axios from 'axios';
import {
  FETCHING_EXCHANGE_RATE_DATA,
  EXCHANGE_RATE_DATA_RECEIVED,
  SET_FIAT_CURRENCY,
  SET_BTC_ADDRESS,
  AN_ERROR_OCCURRED,
  UPDATE_FIAT_VALUE
} from './types';

export const fetchExchangeRateData = () => async dispatch => {
  try {
    dispatch({ type: FETCHING_EXCHANGE_RATE_DATA });
    const response = await axios('https://blockchain.info/ticker');
    dispatch({
      type: EXCHANGE_RATE_DATA_RECEIVED,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: AN_ERROR_OCCURRED,
      payload: error
    });
  }
};

export const setCurrency = currency => ({
  type: SET_FIAT_CURRENCY,
  payload: currency
});

export const setBTCaddress = btcAddress => ({
  type: SET_BTC_ADDRESS,
  payload: btcAddress
});

export const updateFiatValue = fiatValue => ({
  type: UPDATE_FIAT_VALUE,
  payload: fiatValue
});
