import {
  FETCHING_EXCHANGE_RATE_DATA,
  EXCHANGE_RATE_DATA_RECEIVED,
  SET_FIAT_CURRENCY,
  SET_BTC_ADDRESS,
  AN_ERROR_OCCURRED
} from '../actions/types';

const initialState = {
  exchangeRateData: null,
  lastUpdated: null,
  currency: 'USD',
  fiatValue: '',
  btcAddress: '',
  error: null,
  loading: true,
  showQRcode: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_EXCHANGE_RATE_DATA:
      return { ...state, loading: true };
    case EXCHANGE_RATE_DATA_RECEIVED:
      return {
        ...state,
        exchangeRateData: action.payload,
        loading: false,
        lastUpdated: Date().toString()
      };
    case SET_FIAT_CURRENCY:
      return { ...state, currency: action.payload };
    case SET_BTC_ADDRESS:
      return { ...state, btcAddress: action.payload };
    case AN_ERROR_OCCURRED:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
