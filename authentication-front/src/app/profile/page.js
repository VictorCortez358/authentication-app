'use client'
import EditProfile from '../../components/EditProfile.jsx';
import Header from '../../components/Header.jsx';
import ProfileInfo from '../../components/ProfileInfo.jsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Back from '../../../public/back.svg';
import { getToken } from './libs/getToken.js';
import Cookies from 'js-cookie';

export default function Page() {
    const token = Cookies.get('authToken')

    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState();

    const payload = getToken();
    const sub = payload.sub;

    useEffect(() => {
        const getUser = async () => { 
            try {
                const response = await fetch(`http://localhost:3000/users/${sub}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        getUser();
    }, []);

    if(!user) {
        return <p>Loading...</p>
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Header user={user} />
            {edit ?
                <>
                    <div 
                    onClick={() => setEdit(false)}
                    className='w-full flex flex-row items-center px-4 lg:w-6/12 lg:p-4'>
                        <Image src={Back} width={20} height={20} alt="Back"/>
                        <p className='text-sm font-semibold ml-2 text-blue-600 lg:text-lg'>Back</p>
                    </div>
                    <EditProfile />
                </>
                :   
                <>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-semibold mt-4'>Personal Info</h2>
                        <p className='text-sm text-gray-500 mt-2'>Basic info, like your name and photo</p>
                    </div>
                    <ProfileInfo setEdit={setEdit} user={user} />
                </>
            }
        </main>
    )
}
