'use client';
import Image from 'next/image';
import Icon from '../../public/devchallenges.svg';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const onFinish = (router, file) => async (values) => {
    console.log('Success:', values);
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

        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        if (data.error) {
            alert(data.error);
        } else {
            router.push('/');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const FormRegister = ({ router }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <Form
            name="basic"
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem',
            }}
            onFinish={onFinish(router, file)}
            onFinishFailed={onFinishFailed}
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
    );
};

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
