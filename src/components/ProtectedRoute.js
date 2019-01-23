// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// function ProtectedRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         fakeAuth.isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: props.location }
//               }}
//             />
//           )
//       }
//     />
//   );
// }

// export default ProtectedRoute;
