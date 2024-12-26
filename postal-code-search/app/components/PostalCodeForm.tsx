'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../redux/postalCodeSlice';
import { RootState, AppDispatch } from '../redux/store';

type FormInputs = {
  postalCode: string;
};

const PostalCodeForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const dispatch = useDispatch<AppDispatch>();
  const { address, loading, error } = useSelector(
    (state: RootState) => state.postalCode
  );

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(fetchAddress(data.postalCode));
    reset();
  };

  return (
    <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center text-blue-600'>
        郵便番号検索
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <label
            htmlFor='postalCode'
            className='block text-lg font-medium text-gray-700'
          >
            郵便番号:
          </label>
          <input
            id='postalCode'
            type='text'
            {...register('postalCode', { required: true })}
            className='w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none'
            placeholder='例: 1000001'
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 disabled:opacity-50'
        >
          {loading ? '検索中...' : '検索'}
        </button>
      </form>
      {/* エラーがあれば住所を非表示 */}
      {error ? (
        <p className='mt-4 text-red-600 font-medium text-center'>
          エラー: {error}
        </p>
      ) : (
        address && (
          <p className='mt-4 text-green-700 font-medium text-center'>
            住所: {address}
          </p>
        )
      )}
    </div>
  );
};

export default PostalCodeForm;
