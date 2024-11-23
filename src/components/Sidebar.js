import React from 'react';
import 'boxicons/css/boxicons.min.css';
import Modal from './Modal'

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="logo">
                <button className="menu-btn" id="menu-close">
                    <i className="bx bx-log-out-circle"></i>
                </button>
                <i className="bx bx-pulse"></i>
                <a >AsmrProg</a>
            </div>

            <div className="menu">
                <h5>Menu</h5>
                <ul>
                    <li><i className="bx bxs-bolt-circle"></i><a >Explorar</a></li>
                    <li><i className="bx bxs-volume-full"></i><a >Géneros</a></li>
                    <li><i className="bx bxs-album"></i><a >Álbumes</a></li>
                    <li><i className="bx bxs-microphone"></i><a >Artistas</a></li>
                    <li><i className="bx bxs-radio"></i><a >Podcasts</a></li>
                </ul>
            </div>

            <div className="menu">
                <h5>Biblioteca</h5>
                <ul>
                    <li><i className="bx bx-undo"></i><a >Recientes</a></li>
                    <li><i className="bx bxs-photo-album"></i><a >Álbumes</a></li>
                    <li><i className="bx bxs-heart"></i><a >Favoritos</a></li>
                    <li><i className="bx bxs-folder"></i><a >Locales</a></li>
                </ul>
            </div>

            <div className="menu">
                <h5>Musica</h5>
                <ul>
                    <Modal></Modal>
                    <li><i className="bx bxs-caret-right-circle"></i><a >Lo Mejor de 2023</a></li>
                    <li><i className="bx bxs-caret-right-circle"></i><a >Lo Mejor de 2024</a></li>
                    <li><i className="bx bxs-caret-right-circle"></i><a >Kael Fischer</a></li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
