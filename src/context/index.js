import React from 'react';

const userContext = React.createContext();
const { Provider: UserProvider, Consumer: UserConsumer } = userContext;

export { UserProvider, UserConsumer };
