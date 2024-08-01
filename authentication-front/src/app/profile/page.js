"use client";
import EditProfile from '../../components/EditProfile.jsx';
import Header from '../../components/Header.jsx';
import ProfileInfo from '../../components/ProfileInfo.jsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Back from '../../../public/back.svg';
import Cookies from 'js-cookie';
import { Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';


export default function Page() {
    const router = useRouter();
    const token = Cookies.get('authToken');
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const sub = decodedToken.sub;
            fetchUserData(sub, decodedToken);
        } else {
            router.push('/login');
        }
    }, [token]);

    const fetchUserData = async (sub, decodedToken) => {
        try {
            if (decodedToken.name) {
                setUser(decodedToken);
            } else {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${sub}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            }
        } catch (error) {
            message.error('An error occurred while fetching user data.');
            console.error('Error:', error);
        }
    };

    if (!user) {
        return (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', height: '100vh' }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Header user={user} />
            {edit ? (
                <>
                    <div className='w-auto flex flex-row items-center mr-auto px-4 lg:mr-0 lg:w-6/12 lg:p-4'>
                        <div className='w-auto flex flex-row items-center cursor-pointer' onClick={() => setEdit(false)}>
                            <Image src={Back} width={20} height={20} alt="Back" />
                            <p className='text-sm font-semibold ml-1 text-blue-600 lg:text-lg'>Back</p>
                        </div>
                    </div>
                    <EditProfile sub={user.sub} user={user} token={token} />
                </>
            ) : (
                <>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-semibold mt-4'>Personal Info</h2>
                        <p className='text-sm text-gray-500 mt-2'>Basic info, like your name and photo</p>
                    </div>
                    <ProfileInfo setEdit={setEdit} user={user} />
                </>
            )}
        </main>
    );
}
