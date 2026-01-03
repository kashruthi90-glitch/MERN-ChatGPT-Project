import React from 'react';

const Chats = React.lazy(() => import("chats"));

export default function ChatsMfe() {
    return (
        <React.Suspense fallback={<div> Error loading chats mfe </div>}>
            <Chats />
        </React.Suspense>
    )
}