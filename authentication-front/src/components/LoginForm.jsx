import Image from 'next/image';
import React from 'react';
import Icon from '../../public/devchallenges.svg';
import { Input } from 'antd';
import EmailIcon from '../../public/email_icon.svg';
import PasswordIcon from '../../public/password_icon.svg';


const Form = () => {
    return (
        <form className='flex flex-col items-start justify-center w-full mt-8 gap-4'>
            <Input size="large" placeholder="Email" prefix={<Image src={EmailIcon} alt='Email Icon' />} />
            <Input size="large" placeholder="Password" prefix={<Image src={PasswordIcon} alt='Password Icon' />} />
        </form>
    );
}


const LoginForm = () => {
    return (
        <div className='flex flex-col items-center justify-center p-8'>
            <Image src={Icon} alt='DevChallenges Logo' className='mr-auto'/>
            <h2 className='text-xl font-semibold mt-4'>Join thousands of learners from around the world</h2>
            <p className='text-sm text-gray-500 mt-2'>Master web development by making real-life projects. There are multiple paths for you to choose</p>
            <Form />
            <button className='w-full bg-blue-500 text-white font-semibold rounded-lg p-2 mt-4 text-sm'>Start coding now</button>
            <p className='text-xs text-gray-500 mt-4'>or continue with these social profile</p>
            <div className='flex gap-4 mt-4'>
                <button className='w-1/2 bg-white text-black font-semibold rounded-lg p-2'>Google</button>
                <button className='w-1/2 bg-white text-black font-semibold rounded-lg p-2'>Github</button>
            </div>
            <p className='text-gray-500 mt-4 text-xs'>Already a member? <a href='#' className='text-blue-500'>Login</a></p>
        </div>
    );
}

export default LoginForm;
