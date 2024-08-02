"use client";
import Image from 'next/image';
import Icon from '../../public/devchallenges.svg';
import { Form, Input, Button, Spin, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

// Function to handle form submission
const onFinish = (router, file, setLoading, messageApi) => async (values) => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('bio', values.bio);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('password', values.password);
        if (file) {
            formData.append('photo', file);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setLoading(false);
        if (response.ok) {
            messageApi.success('User registered successfully 🎉');
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            messageApi.error(data.message);
        }
    } catch (error) {
        setLoading(false);
        messageApi.error('An error occurred. Please try again later.');
    }
};

// Form register component
const FormRegister = ({ router }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // Handle file change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
        } else {
            messageApi.error('Please upload a valid image file.');
        }
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
                    marginTop: '1rem',
                }}
                onFinish={onFinish(router, file, setLoading, messageApi)}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>

                <Form.Item name="bio">
                    <Input.TextArea placeholder="Bio" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input placeholder="Phone" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="photo"
                    rules={[
                        {
                            required: true,
                            message: 'Please upload your photo!',
                        },
                    ]}
                >
                    <Input type="file" onChange={handleFileChange} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-blue-500 text-white font-semibold rounded-lg p-2 mt-8 text-sm"
                    >
                        Register now
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

// Main register form component
const RegisterForm = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center p-8 h-screen lg:border-gray-400 lg:border lg:rounded-lg lg:w-1/3 lg:h-auto">
            <Image src={Icon} alt="DevChallenges Logo" className="mr-auto" />
            <h2 className="text-xl font-semibold mt-4">Register</h2>
            <p className="text-sm text-gray-500 mt-2">Create an account to continue</p>
            <FormRegister router={router} />
        </div>
    );
};

export default RegisterForm;
