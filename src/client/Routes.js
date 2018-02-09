import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage'; // required for SSR

// import { Route } from 'react-router-dom';
// export default () => {
//     return (
//         <div>
//             <Route exact path="/" component={Home} />
//             <Route path="/users" component={UsersList} />
//         </div>
//     );
// }

/*
    This is required for Server Side Rendering
*/
export default [
    {
        ...App, // root component
        routes: [
            {
                ...HomePage,
                path: '/',
                exact: true
            },
            {
                ...UsersListPage, // required for SSR
                path: '/users'
            }
        ]
    }
];
