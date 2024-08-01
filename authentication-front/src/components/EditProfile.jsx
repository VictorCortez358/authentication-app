'use client'
import React from 'react';
import { Form, Input, message } from 'antd';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const onFinish = (user, sub, file, setLoading, token, messageApi) => async (values) => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('bio', values.bio);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('password', values.password || user.password);
        if (file) {
            formData.append('photo', file);
        }

        const response = await fetch(`http://localhost:3000/users/${sub}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        const data = await response.json();
        setLoading(false);
        if (data.error) {
            messageApi.error(data.message);
        } else {
            messageApi.success('Profile updated successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1500); 
        }
    } catch (error) {
        setLoading(false);
        messageApi.error(error.message);
    }
};


const FormEdit = ({sub, user, token}) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <>
            {contextHolder}
            {loading && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', height: '100vh' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>
            )}

            <Form
                name="basic"
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '1rem'
                }}
                onFinish={onFinish(user, sub, file, setLoading, token, messageApi)}
                autoComplete="off"
                layout='vertical'

            >
                <Form.Item
                    name="photo"
                >
                    <Input type="file" onChange={handleFileChange} />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    initialValue={user.name}
                >
                    <Input placeholder='Name' />
                </Form.Item>

                <Form.Item
                    label="Bio"
                    name="bio"
                    initialValue={user.bio}
                >
                    <Input.TextArea placeholder='Bio' />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    initialValue={user.phone}
                >

                    <Input placeholder='phone' />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    initialValue={user.email}
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        }
                    ]}
                >

                    <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>

                <Form.Item>
                    <button type="submit" className='px-4 bg-blue-500 text-white font-semibold rounded-lg p-2 mt-2 text-base'>Save</button>
                </Form.Item>

            </Form>
        </>

    );
}

const EditProfile = ({ sub , user, token }) => {
    return (
        <div className='w-full flex flex-col items-start justify-center my-4 px-4 lg:border lg:rounded-lg lg:w-6/12 lg:h-auto lg:border-gray-300'>
            <h3 className='text-lg font-semibold mt-4'>Change Info</h3>
            <p className='text-xs text-gray-500'>Changes will be reflected to every services</p>
            <FormEdit sub={sub} user={user} token={token} />
        </div>
    );
}

export default EditProfile;
