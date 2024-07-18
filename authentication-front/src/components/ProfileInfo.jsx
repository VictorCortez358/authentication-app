import Image from "next/image";
import React from "react";

const footer = () => {
    return (
        <div className="hidden lg:flex lg:flex-row lg:justify-between lg:items-center lg:w-7/12">
            <p className="text-xs text-gray-500 mt-4">Created by Victor Cortez</p>
            <p className="text-gray-500 mt-4 text-xs">devchallenges.io</p>
        </div>
    );
};

const ProfileInfo = ({ setEdit, user }) => {
    const handleEdit = () => {
        setEdit(true);
    };

    const cutPassword = (password) => {
        // acorta la contraseña para mostrar solo los primeros 4 caracteres solo eso nada mas
        return password.slice(0, 4) + "...";
    };

    const getImageUrl = (path) => {
        return `http://localhost:3000/${path.replace(/\\/g, "/")}`;
    };



    const userFields = [
        {
            label: "PHOTO",
            value: (
                <Image
                    src={getImageUrl(user.photo)}
                    alt="Profile Photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
            ),
        },
        { label: "NAME", value: user.name },
        { label: "BIO", value: user.bio },
        { label: "PHONE", value: user.phone },
        { label: "EMAIL", value: user.email },
        { label: "PASSWORD", value: cutPassword(user.password) },
    ];

    return (
        <>
            <div className="flex flex-col items-center justify-center my-4 lg:border lg:rounded-lg lg:w-7/12 lg:h-auto">
                <div className="flex flex-row justify-between items-center gap-4 w-full p-4 border-b">
                    <div className="flex flex-col items-start justify-center w-2/3 my-2">
                        <h3 className="text-base lg:text-lg font-semibold">Profile</h3>
                        <p className="text-xs text-gray-500">
                            Some info may be visible to other people
                        </p>
                    </div>
                    <button
                        onClick={handleEdit}
                        className="text-gray-500 text-sm px-4 lg:px-7 py-1 border rounded-md border-gray-500"
                    >
                        Edit
                    </button>
                </div>
                <div className="w-full">
                    {userFields.map((field, index) => (
                        <div
                            key={index}
                            className="flex flex-row justify-between items-center gap-4 w-full p-4 border-b"
                        >
                            <div className="flex flex-col items-start justify-center w-1/3">
                                <h3 className="text-xs font-semibold text-gray-400">
                                    {field.label}
                                </h3>
                            </div>
                            <div className="flex flex-col items-start justify-center w-2/3">
                                <p className="text-sm text-gray-700">{field.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {footer()}
        </>
    );
};

export default ProfileInfo;
