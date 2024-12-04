import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import SignUp from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Unauthorized from './Pages/Unauthorized.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/unauthorized' element={<Unauthorized />} />

            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                <Route path='/dashBoard/admin' element={<DashBoard role="admin" />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={['moderator']} />}>
                <Route path='/dashBoard/moderator' element={<DashBoard role="moderator" />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={['user']} />}>
                <Route path='/dashBoard/user' element={<DashBoard role="user" />} />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
