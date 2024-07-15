'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Avatar from '../../public/avatar.svg';
import Down from '../../public/down.svg';
import Icon from '../../public/devchallenges.svg';
import Profile from '../../public/profile.svg';
import Group from '../../public/group.svg';
import Logout from '../../public/logout.svg';
import Up from '../../public/up.svg';



const Header = () => {

    const Options = [
        {
            label: 'My Profile',
            link: '/profile',
            img: Profile
        },
        {
            label: 'Group Chat',
            link: '/group-chat',
            img: Group
        },
        {
            label: 'Logout',
            link: '/logout',
            img: Logout
        }
    ];


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex flex-row justify-between items-center w-full p-4'>
            <Image src={Icon} alt='DevChallenges Logo' className='mr-auto' />
            <div className='relative'>
                <div className='flex flex-row justify-center items-center gap-4 cursor-pointer' onClick={toggleDropdown}>
                    <Image src={Avatar} alt='Profile' className='w-8 h-8 rounded-full' />
                    <p className='text-xs text-black'>Xanthe Neal</p>
                    <Image src={isOpen ? Up : Down} alt='Dropdown' className='w-4 h-4' />
                </div>
                {isOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white border rounded p-4'>
                        {Options.map((option, index) => (
                            <div key={index} className='flex flex-row justify-start items-center px-2 rounded-md hover:bg-gray-100'>
                                <Image src={option.img} alt={option.label} className='w-6 h-6 rounded-full' />
                                <a href='/profile' className='block px-4 py-2 text-xs text-gray-700'>{option.label}</a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default Header;
