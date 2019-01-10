import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorizedPage = () => (
    <div>
        <div>You are unauthorized to view this pages.</div>
        <Link to="/">Move to homepage</Link>
    </div>
)

export default UnAuthorizedPage;
