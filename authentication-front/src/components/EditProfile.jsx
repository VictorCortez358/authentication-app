'use client'
import React from 'react';
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


const FormEdit = () => {
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
            layout='vertical'

        >
            <Form.Item  valuePropName="fileList" getValueFromEvent={normFile}>
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

            <Form.Item
                label="Name"
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
                label="Bio"
                name="bio">
                <Input.TextArea placeholder='Bio' />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone!',
                    },
                ]}
            >

                <Input placeholder='phone' />
            </Form.Item>

            <Form.Item
                label="Email"
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
                label="Password"
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

            <Form.Item>
                <button type="submit" className='px-4 bg-blue-500 text-white font-semibold rounded-lg p-2 mt-8 text-base'>Save</button>
            </Form.Item>

        </Form>
    );
}

const EditProfile = () => {
    return (
        <div className='w-full flex flex-col items-start justify-center my-4 px-4 lg:border lg:rounded-lg lg:w-6/12 lg:h-auto lg:p-8 lg:border-gray-300'>
            <h3 className='text-lg font-semibold'>Change Info</h3>
            <p className='text-xs text-gray-500'>Changes will be reflected to every services</p>
            <FormEdit />
        </div>
    );
}

export default EditProfile;
