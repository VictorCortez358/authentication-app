"use client";
import Image from "next/image";
import Icon from "../../public/devchallenges.svg";
import { useRouter } from "next/navigation";
import Cookie from 'js-cookie';
import { Form, Input } from "antd";

const onFinish = (router) => async (values) => {
    try {
        const response = await fetch("http://localhost:3000/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        });

        const data = await response.json();
        if (data.access_token) {
            Cookie.set('authToken', data.access_token, { expires: 7 });
            router.push('/profile');
        } else {
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        console.error(error);
    }
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const LoginForm = ({ router }) => {
    return (
        <Form
            name="basic"
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem'
            }}
            onFinish={onFinish(router)}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

        >
            <Form.Item
                name="email"
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
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}

            >
                <Input.Password
                    placeholder='Password'
                    type='password'
                />
            </Form.Item>

            <Form.Item>
                <button type="submit" className='w-full bg-blue-500 text-white font-semibold rounded-lg p-2 mt-8 text-sm'>Start coding now</button>
            </Form.Item>
        </Form>
    );
};

const footer = () => {
    return (
        <div className="hidden h-0 lg:flex lg:flex-row lg:justify-between lg:items-center lg:w-full lg:max-w-[450px] lg:mt-2">
            <p className="text-xs text-gray-500 mt-4">Created by Victor Cortez</p>
            <p className="text-gray-500 mt-4 text-xs">devchallenges.io</p>
        </div>
    );
};

const Login = () => {
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8 h-screen lg:border-gray-400 lg:border lg:rounded-lg lg:w-1/3 lg:p-12 lg:h-auto">
                <Image src={Icon} alt="DevChallenges Logo" className="mr-auto" />
                <h2 className="text-xl font-semibold mt-4 lg:text-2xl">
                    Join thousands of learners from around the world
                </h2>
                <p className="text-sm text-gray-500 mt-2 lg:text-base">
                    Master web development by making real-life projects. There are
                    multiple paths for you to choose
                </p>
                <LoginForm router={router} />
                <p className="text-xs text-gray-500 mt-4 lg:text-sm">
                    or continue with these social profile
                </p>
                <p className="text-gray-500 mt-4 text-xs lg:text-sm">
                    Don't have an account yet?{" "}
                    <a
                        href="#"
                        className="text-blue-500"
                        onClick={() => {
                            router.push("/register");
                        }}
                    >
                        Register
                    </a>
                </p>
            </div>
            {footer()}
        </>
    );
};

export default Login;
