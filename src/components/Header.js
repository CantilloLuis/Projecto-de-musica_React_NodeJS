import React from 'react';

function Header() {
    return (
        <header>
            <div className="nav-links">
                <button className="menu-btn" id="menu-open">
                    <i className="bx bx-menu"></i>
                </button>
                <a href="#">Music</a>
                <a href="#">Live</a>
                <a href="#">Podcast</a>
            </div>
            {/* <div className="search">
                <i className="bx bx-search"></i>
                <input type="text" placeholder="Type here to search" />
            </div> */}
        </header>
    );
}

export default Header;
