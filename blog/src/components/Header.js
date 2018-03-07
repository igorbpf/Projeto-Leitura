import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <Link to='/'>Redux Blog</Link>
                </div>
            </div>
        </nav>
)

export default Header;
