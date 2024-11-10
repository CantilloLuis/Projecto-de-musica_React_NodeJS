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
                <a href="#">AsmrProg</a>
            </div>

            <div className="menu">
                <h5>Menu</h5>
                <ul>
                    <li><i className="bx bxs-bolt-circle"></i><a href="#">Explorar</a></li>
                    <li><i className="bx bxs-volume-full"></i><a href="#">Géneros</a></li>
                    <li><i className="bx bxs-album"></i><a href="#">Álbumes</a></li>
                    <li><i className="bx bxs-microphone"></i><a href="#">Artistas</a></li>
                    <li><i className="bx bxs-radio"></i><a href="#">Podcasts</a></li>
                </ul>
            </div>

            <div className="menu">
                <h5>Biblioteca</h5>
                <ul>
                    <li><i className="bx bx-undo"></i><a href="#">Recientes</a></li>
                    <li><i className="bx bxs-photo-album"></i><a href="#">Álbumes</a></li>
                    <li><i className="bx bxs-heart"></i><a href="#">Favoritos</a></li>
                    <li><i className="bx bxs-folder"></i><a href="#">Locales</a></li>
                </ul>
            </div>

            <div className="menu">
                <h5>Musica</h5>
                <ul>
                    <Modal></Modal>
                    <li><i className="bx bxs-caret-right-circle"></i><a href="#">Lo Mejor de 2023</a></li>
                    <li><i className="bx bxs-caret-right-circle"></i><a href="#">Lo Mejor de 2024</a></li>
                    <li><i className="bx bxs-caret-right-circle"></i><a href="#">Kael Fischer</a></li>
                </ul>
            </div>

            {/* <div className="playing">
                <div className="top">
                    <img src="assets/current.png" alt="Actual" />
                    <h4>Apple<br />Homepod</h4>
                </div>
                <div className="bottom">
                    <i className="bx bx-podcast"></i>
                    <p>Reproduciendo en Dispositivo</p>
                </div>
            </div> */}
        </aside>
    );
}

export default Sidebar;
