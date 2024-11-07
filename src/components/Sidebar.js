import React from 'react';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="logo">
                <button className="menu-btn" id="menu-close">
                    <i className="bx bx-log-out-circle"></i>
                </button>
                <i className="bx bx-pulse"></i>
                <a href="#">AsmrProg</a>
            </div>

            <div className="menu">
                <h5>Menu</h5>
                <ul>
                    <li><i className="bx bxs-bolt-circle"></i><a href="#">Explore</a></li>
                    <li><i className="bx bxs-volume-full"></i><a href="#">Genres</a></li>
                    <li><i className="bx bxs-album"></i><a href="#">Albums</a></li>
                    <li><i className="bx bxs-microphone"></i><a href="#">Artists</a></li>
                    <li><i className="bx bxs-radio"></i><a href="#">Podcasts</a></li>
                </ul>
            </div>

            <div className="menu">
                <h5>Library</h5>
                <ul>
                    <li><i className="bx bx-undo"></i><a href="#">Recent</a></li>
                    <li><i className="bx bxs-photo-album"></i><a href="#">Albums</a></li>
                    <li><i className="bx bxs-heart"></i><a href="#">Favourites</a></li>
                    <li><i className="bx bxs-folder"></i><a href="#">Local</a></li>
                </ul>
            </div>

            <div className="menu">
                <h5>Playlist</h5>
                <ul>
                    <li><i className="bx bxs-plus-square"></i><a href="#">Create New</a></li>
                    <li><i className="bx bxs-caret-right-circle"></i><a href="#">Best of 2023</a></li>
                    <li><i className="bx bxs-caret-right-circle"></i><a href="#">Best of 2022</a></li>
                    <li><i className="bx bxs-caret-right-circle"></i><a href="#">Kael Fischer</a></li>
                </ul>
            </div>

            <div className="playing">
                <div className="top">
                    <img src="assets/current.png" alt="Current" />
                    <h4>Apple<br />Homepod</h4>
                </div>
                <div className="bottom">
                    <i className="bx bx-podcast"></i>
                    <p>Playing On Device</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
