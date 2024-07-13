'use client';
import Image from 'next/image';
import Icon from '../../public/devchallenges.svg';
import { Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


const FormRegister = () => {
    return (
        <Form
            name="basic"
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem'
            }}
            onFinish={onFinish}
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
                <Input placeholder='Name' />
            </Form.Item>

            <Form.Item
                name="bio">
                <Input.TextArea placeholder='Bio' />
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

                <Input placeholder='Email' />
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
                <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                    <button
                        style={{
                            border: 0,
                            background: 'none',
                        }}
                        type="button"
                    >
                        <PlusOutlined />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            Upload a photo
                        </div>
                    </button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <button type="submit" className='w-full bg-blue-500 text-white font-semibold rounded-lg p-2 mt-8 text-sm'>Register now</button>
            </Form.Item>

        </Form>
    );
}


const RegisterForm = () => {
    return (
        <div className='flex flex-col items-center justify-center p-8 h-screen'>
            <Image src={Icon} alt='DevChallenges Logo' className='mr-auto' />
            <h2 className='text-xl font-semibold mt-4'>Register</h2>
            <p className='text-sm text-gray-500 mt-2'>Create an account to continue</p>
            <FormRegister />
        </div>
    );
}

export default RegisterForm;
