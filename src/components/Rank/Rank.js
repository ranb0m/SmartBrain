import React from "react";

export default function Rank({ user }) {
    return (
        <>
        <div className="center">
            {`${user.name}'s entry count is ${user.entries}`}
        </div>
        <div className="center">
            You have the #{user.rank} most detected faces!
        </div>
        </>
    )
};