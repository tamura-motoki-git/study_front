import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

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

// 非同期アクション（Thunk）を作成
export const fetchAddress = createAsyncThunk(
  'postalCode/fetchAddress',
  async (postalCode: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
      );
      const data = await response.json();
      if (data.results) {
        return `${data.results[0].address1} ${data.results[0].address2} ${data.results[0].address3}`;
      } else {
        return rejectWithValue('Address not found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Sliceの作成
const postalCodeSlice = createSlice({
  name: 'postalCode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAddress.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.address = action.payload;
        }
      )
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postalCodeSlice.reducer;
