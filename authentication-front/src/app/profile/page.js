'use client'
import EditProfile from '@/components/EditProfile';
import Header from '@/components/Header';
import ProfileInfo from '@/components/ProfileInfo';
import Image from 'next/image';
import { useState } from 'react';
import Back from '../../../public/back.svg'

export default function page() {

    const [edit, setEdit] = useState(false);

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Header />
            {edit ?
                <>
                    <div 
                    onClick={() => setEdit(false)}
                    className='w-full flex flex-row items-center px-4 lg:w-6/12 lg:p-4'>
                        <Image src={Back} width={20} height={20} />
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
                    <ProfileInfo setEdit={setEdit} />
                </>
            }
        </main>
    )
}