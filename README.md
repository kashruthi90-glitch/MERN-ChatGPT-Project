# MERN-ChatGPT-Project

# Project description
This is the MERN Stack application featuring a Microfrontend (MFE) architecture. This project provides an intelligent chat interface powered by Google Gemini AI for real-time text and image generation.

This is built with:
* Frontend: Vite & React
* Monorepo: npm workspaces
* AI: Google Gemini API
* Backend: Node.js, Express
* Database: MongoDB (Mongoose)

# Authentication & Security
This project uses JWT (JSON Web Tokens) for authentication, delivered via httpOnly cookies. This approach prevents Cross-Site Scripting (XSS) attacks from stealing the session token.

* Frontend Configuration (Axios)
Because the frontend and backend run on different origins during development, you must enable the withCredentials flag. This tells the browser to include cookies in cross-origin requests and to accept the Set-Cookie header from the server
```
in login mfe: (login api call)
// Example: Setting withCredentials in Axios
axios.post('http://localhost:3000/api/login', data, {
    withCredentials: true
})
```

* Server-Side Authentication (Node.js/Express)
The backend implements a secure authentication flow using JSON Web Tokens (JWT) and Express middleware. Instead of sending the token in the JSON body, it is delivered via a secure cookie to mitigate common web vulnerabilities.

- Token Generation & Delivery:
    When a user logs in, the server signs a JWT and attaches it to the response using the res.cookie() method.
```
    res.cookie('token', token, {
        httpOnly: true,     // 🛡️ Prevents XSS: Token cannot be accessed via JS (document.cookie)
        secure: false,      // 🔒 Set to true in production (requires HTTPS)
        sameSite: 'lax',    // 🍪 CSRF Protection: Standard for cross-origin local dev
        maxAge: 3600000     // ⏳ 1 hour in milliseconds
    });
```
- Security Features Explained:
    "httpOnly: true"	This is the most critical setting. It ensures the token is invisible to JavaScript, preventing malicious scripts from stealing the session token during a Cross-Site Scripting (XSS) attack.
    "sameSite: 'lax'"	Protects against Cross-Site Request Forgery (CSRF). It ensures the browser only sends the cookie for "safe" top-level navigations and requests originating from your application.
    "secure"	When set to true, the cookie is only transmitted over encrypted (HTTPS) connections. For local development on http://localhost, this must be false.

- Middleware Verification: (in protected routes middleware)
    use cookieParser middleware to parse the httpOnly cookie 
```
    express.use(cookieParser())
    express.cors({
        origin: '', // set the frontend url
        credentials: true // this is needed
    })
```

# verifying cookie in browser
You can verify that the server has successfully sent the token by inspecting the browser:
Open Developer Tools.
Navigate to the Application tab.
Select Cookies from the left-hand sidebar.
Locate your backend URL.
The token cookie will appear here. If correctly configured, the HttpOnly column will have a checkmark/tick.

# Understanding HttpOnly Storage
* Storage: Like standard cookies, httpOnly cookies are stored in the browser's internal cookie jar.
* Access Control: The key difference is accessibility. While standard cookies can be read by JavaScript via document.cookie, httpOnly cookies are inaccessible to client-side scripts.
* Automatic Transmission: The browser automatically attaches these cookies to every outgoing HTTP request to the associated domain, ensuring the server can validate the user's session securely.