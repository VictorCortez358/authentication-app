"use client";
import Image from "next/image";
import Icon from "../../public/devchallenges.svg";
import Google from "../../public/Google.svg";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { Form, Input, message, Spin } from "antd";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";

const onFinish =
    (router, setErrorFields, setLoading, messageApi) => async (values) => {
        setLoading(true);
        setErrorFields([]);
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
            setLoading(false);
            if (data.access_token) {
                Cookie.set("authToken", data.access_token, { expires: 7 });
                router.push("/profile");
            } else {
                setErrorFields([data.message]);
                messageApi.error(data.message);
            }
        } catch (error) {
            setLoading(false);
            setErrorFields([error.message]);
            messageApi.error(error.message);
            console.error(error);
        }
    };


const LoginForm = ({ router }) => {
    const [errorFields, setErrorFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        height: "100vh",
                    }}
                >
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>
            )}
            <Form
                name="basic"
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "1rem",
                }}
                onFinish={onFinish(router, setErrorFields, setLoading, messageApi)}
                autoComplete="off"
            >
                <Form.Item
                    id="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    id="password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" type="password" />
                </Form.Item>

                <Form.Item>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-sans font-semibold rounded-lg p-2  text-sm"
                    >
                        Start coding now
                    </button>
                </Form.Item>
            </Form>
        </>
    );
};

const footer = () => {
    return (
        <div className="hidden h-0 lg:flex lg:flex-row lg:justify-between lg:items-center lg:w-1/3 lg:mt-2">
            <p className="text-xs text-gray-500 mt-4">Created by Victor Cortez</p>
            <p className="text-gray-500 mt-4 text-xs">devchallenges.io</p>
        </div>
    );
};

const Login = () => {
    const router = useRouter();

    const handleGoogleLogin = async (event) => {
        event.preventDefault();
        window.location.href = "http://localhost:3000/auth/callback/google";
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8 h-screen gap-2 lg:border-gray-400 lg:border lg:rounded-lg lg:w-1/3 lg:p-12 lg:h-auto">
                <Image src={Icon} alt="DevChallenges Logo" className="mr-auto" />
                <h2 className="font-sans font-[600] text-title-gray text-lg mt-4 lg:text-2xl">
                    Join thousands of learners from around the world
                </h2>
                <p className="font-sans font-[400] text-base text-title-gray mt-2 lg:text-base">
                    Master web development by making real-life projects. There are
                    multiple paths for you to choose
                </p>
                <LoginForm router={router} />
                <span className="font-sans text-xs text-gray-500 mt-4 lg:text-sm">
                    or continue with these social profile
                </span>
                <Image
                    onClick={handleGoogleLogin}
                    src={Google}
                    alt="DevChallenges Logo"
                    className="cursor-pointer"
                />
                <p className="font-sans text-gray-500 mt-4 text-xs lg:text-sm">
                    Don't have an account yet?{" "}
                    <Link href="/register" className="text-blue-500">
                        Register
                    </Link>
                </p>
            </div>
            {footer()}
        </>
    );
};

export default Login;
