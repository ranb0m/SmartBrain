import React from "react";

export default function Rank({ user }) {
    return (
        <>
        <div className="center">
            {`${user.name}'s entry count is ${user.entries}`}
        </div>
        <div className="center">
            {'#1'}
        </div>
        </>
    )
};