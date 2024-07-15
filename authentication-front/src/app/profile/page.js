import Header from '@/components/Header';
import ProfileInfo from '@/components/ProfileInfo';
import React from 'react';

export default function page() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Header />
            <div className='flex flex-col items-center justify-center'>
                <h2 className='text-xl font-semibold mt-4'>Personal Info</h2>
                <p className='text-sm text-gray-500 mt-2'>Basic info, like your name and photo</p>
            </div>
            <ProfileInfo />
        </main>
    )
}