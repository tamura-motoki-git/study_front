'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../redux/postalCodeSlice';
import { RootState } from '../redux/store';

type FormInputs = {
  postalCode: string;
};

const PostalCodeForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const dispatch = useDispatch();
  const { address, loading, error } = useSelector(
    (state: RootState) => state.postalCode
  );

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(fetchAddress(data.postalCode));
    reset();
  };

  return (
    <div>
      <h1>Postal Code Search</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='postalCode'>Postal Code:</label>
        <input
          id='postalCode'
          type='text'
          {...register('postalCode', { required: true })}
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {address && <p>Address: {address}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default PostalCodeForm;
