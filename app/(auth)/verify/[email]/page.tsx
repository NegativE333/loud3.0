

type Props = {
    params: {email: string}
  }
  
  import React from 'react'
  import InputOTPForm from '../component/input-otp-form';
  
  export default function verify({
    params
  }: Props) {
  
    return (
      <div className='flex flex-col gap-8 h-full items-center justify-center'>
        <InputOTPForm 
          email={decodeURIComponent(params.email)}
        />
      </div>
    )
  }
  