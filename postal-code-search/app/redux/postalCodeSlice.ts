import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface PostalCodeState {
  address: string;
  loading: boolean;
  error: string | null;
}

const initialState: PostalCodeState = {
  address: '',
  loading: false,
  error: null,
};

export const fetchAddress = createAsyncThunk(
  'postalCode/fetchAddress',
  async (postalCode: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
      );
      const data = await response.json();
      if (data.results) {
        const address = `${data.results[0].address1} ${data.results[0].address2} ${data.results[0].address3}`;
        return address;
      } else {
        return rejectWithValue('該当する住所が見つかりませんでした');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const postalCodeSlice = createSlice({
  name: 'postalCode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const postalCodeReducer = postalCodeSlice.reducer;
