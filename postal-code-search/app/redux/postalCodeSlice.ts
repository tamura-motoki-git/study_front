import { Dispatch } from 'redux';

export type PostalCodeState = {
  address: string;
  loading: boolean;
  error: string | null;
};

const initialState: PostalCodeState = {
  address: '',
  loading: false,
  error: null,
};

type Action =
  | { type: 'FETCH_ADDRESS_START' }
  | { type: 'FETCH_ADDRESS_SUCCESS'; payload: string }
  | { type: 'FETCH_ADDRESS_FAILURE'; payload: string };

export const postalCodeReducer = (
  state = initialState,
  action: Action
): PostalCodeState => {
  switch (action.type) {
    case 'FETCH_ADDRESS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_ADDRESS_SUCCESS':
      return { ...state, loading: false, address: action.payload };
    case 'FETCH_ADDRESS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fetchAddress =
  (postalCode: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: 'FETCH_ADDRESS_START' });
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
      );
      const data = await response.json();
      if (data.results) {
        const address = `${data.results[0].address1} ${data.results[0].address2} ${data.results[0].address3}`;
        dispatch({ type: 'FETCH_ADDRESS_SUCCESS', payload: address });
      } else {
        dispatch({
          type: 'FETCH_ADDRESS_FAILURE',
          payload: 'Address not found',
        });
      }
    } catch (error: any) {
      dispatch({ type: 'FETCH_ADDRESS_FAILURE', payload: error.message });
    }
  };
