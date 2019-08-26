import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from 'shared/App';
import Menu from '/components/Menu';

const Root = () => (
    <BrowserRouter>
        <Menu/>
    </BrowserRouter>
);

export default Root;