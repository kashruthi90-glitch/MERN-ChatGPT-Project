import React from 'react';

const Login = React.lazy(() => import("login")
//   import("login").then(module => ({ default: module.default }))
);

export default function LoginMfe() {
    return (
        <React.Suspense fallback={<div> Error loading mfe </div>}>
            <Login />
        </React.Suspense>
    );
}