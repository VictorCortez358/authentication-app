"use client";
import Image from "next/image";
import Icon from "../../public/devchallenges.svg";
import { Input } from "antd";
import EmailIcon from "../../public/email_icon.svg";
import PasswordIcon from "../../public/password_icon.svg";
import { useRouter } from "next/navigation";

const Form = () => {
    return (
        <form className="flex flex-col items-start justify-center w-full mt-8 gap-4">
            <Input
                size="large"
                placeholder="Email"
                prefix={<Image src={EmailIcon} alt="Email Icon" />}
            />
            <Input
                size="large"
                placeholder="Password"
                prefix={<Image src={PasswordIcon} alt="Password Icon" />}
            />
        </form>
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

const LoginForm = () => {
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col items-center justify-center p-8 h-screen lg:border-gray-400 lg:border lg:rounded-lg lg:max-w-[450px] lg:p-12 lg:h-auto">
                <Image src={Icon} alt="DevChallenges Logo" className="mr-auto" />
                <h2 className="text-xl font-semibold mt-4 lg:text-2xl">
                    Join thousands of learners from around the world
                </h2>
                <p className="text-sm text-gray-500 mt-2 lg:text-base">
                    Master web development by making real-life projects. There are
                    multiple paths for you to choose
                </p>
                <Form />
                <button className="w-full bg-blue-500 text-white font-semibold rounded-lg p-2 mt-8 text-sm">
                    Start coding now
                </button>
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

export default LoginForm;
