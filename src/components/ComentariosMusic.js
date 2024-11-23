import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Rating from '@mui/material/Rating';
import toast, { Toaster } from 'react-hot-toast';






const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: '#f5f5f5',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 550,
    borderRadius: '10px'

};

function ComentariosMusic({ songId, onSongRating }) {

    const location = useLocation();
    const [getUserId, setUserId] = useState([]);
    const [getUsername, setUsername] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [calificacion, setCalificacion] = useState(0);
    const [comments, setComments] = useState([]); // Array de comentarios
    const [newComment, setNewComment] = useState(''); // Texto del nuevo comentario
    const [editingCommentId, setEditingCommentId] = useState(null); // ID del comentario que se está editando
    const [editedCommentText, setEditedCommentText] = useState(''); // Texto editado del comentario

    useEffect(() => {
        if (songId) {
            fetchComments(); // Cargar comentarios cuando cambia el ID de la canción
        }
    }, [songId]);


    useEffect(() => {
        const { token, username } = location.state || {};
        if (token) {
            try {
                // Decodifica el token y obtiene el _id del usuario
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.userId); // Extrae el _id del token
                setUsername(username);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
    }, [location.state]);

    // Obtener comentarios para la canción actual
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/music/musicById/${songId}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data.comentarios || []);
            }
        } catch (error) {
            console.error('Error al cargar comentarios:', error);
        }
    };

    // Función para manejar el cambio de la calificación
    const handleRatingChange = (event) => {
        setCalificacion(event.target.value);
    };

    // Manejar la adición de un nuevo comentario
    const handleAddComment = async () => {
        if (newComment.trim() && calificacion != 0) {
            try {
                const response = await fetch(`http://localhost:3001/api/music/comentarios/${songId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: newComment, userId: getUserId, calificacion: calificacion, username: getUsername }),
                });
                if (response.ok) {
                    setNewComment(''); // Limpiar el campo de comentario
                    setCalificacion('');
                    fetchComments();
                    onSongRating();

                    //Alerta que saldra al agregar comentarios
                    toast.success('Comentario agregado', {
                        duration: 3000, // 3 segundos
                        position: 'top-center',
                        style: {
                            background: '#4caf50',
                            color: '#fff',
                        },
                    });

                }
            } catch (error) {
                console.error('Error al añadir comentario:', error);
            }
        } else {

            // Validar que el textarea no esté vacío
            toast.error('El comentario y la calificacion son obligatorios.', {
                duration: 3000,
                position: 'top-center',
                style: { background: '#ff4d4d', color: '#fff' },
            });

        }
    };

    // Manejar la actualización de un comentario
    const handleUpdateComment = async (commentId) => {
        if (editedCommentText.trim()) {
            try {
                const response = await fetch(`http://localhost:3001/api/music/${songId}/comentario_update/${commentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: editedCommentText }),
                });

                if (response.ok) {
                    const updatedComment = await response.json();
                    setComments(
                        comments.map((comment) =>
                            comment._id === commentId ? { ...comment, text: updatedComment.comment.text } : comment
                        )
                    );
                    setEditingCommentId(null); // Dejar de editar
                    setEditedCommentText('');
                }
            } catch (error) {
                console.error('Error al actualizar comentario:', error);
            }
        }
    };

    // Manejar la eliminación de un comentario
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/music/${songId}/comentario_delete/${commentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setComments(comments.filter((comment) => comment._id !== commentId)); // Eliminar el comentario de la lista
                onSongRating();
            }
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
        }
    };

    const handleLikeDislike = async (commentId, action, userId, username) => {
        try {
            const response = await fetch(`http://localhost:3001/api/music/${songId}/comentario_reaccion/${commentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action, userId, username }),
            });
            if (response.ok) {
                fetchComments();
            }
        } catch (error) {
            console.error(`Error al ${action} comentario:`, error);
        }
    };

    return (
        <div>
            <div align="center">
                <Button
                    sx={{
                        backgroundColor: '#3f51b5',  // Color principal del botón
                        color: '#fff',               // Color del texto
                        fontSize: '16px',            // Tamaño del texto
                        borderRadius: '8px',         // Bordes redondeados
                        '&:hover': {                 // Estilo al pasar el cursor
                            backgroundColor: '#00BFFF' // Color de fondo en hover
                        }
                    }}
                    onClick={handleOpen}>Comentar musica</Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography component={'span'} id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="comments-section">
                            <Toaster reverseOrder={false} />
                            <div className='comments-list'>
                                {comments.map((comment) => (
                                    <div key={comment._id} className="comment">

                                        {editingCommentId === comment._id ? (
                                            <div>
                                                <textarea
                                                    className="reply-box"
                                                    placeholder="Escribe un comentario....."
                                                    value={editedCommentText}
                                                    onChange={(e) => setEditedCommentText(e.target.value)}
                                                    style={{ width: '90%', height: '80px', fontSize: '14px' }} // Ajusta el tamaño y estilo aquí

                                                ></textarea>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <Button size="small" variant="contained" endIcon={<SendIcon />} onClick={() => handleUpdateComment(comment._id)}>Actualizar</Button>
                                                    <Button size="small" variant="contained" onClick={() => setEditingCommentId(null)}>Cancelar</Button>
                                                </div>

                                            </div>
                                        ) : (
                                            <div>
                                                <div className="comment-header">
                                                    <img className='avatar' src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                                                    <span className="username"> <strong>{comment.username === getUsername ? 'Tú' : comment.username}</strong>:</span>
                                                    <span className="timestamp">10 day ago</span>
                                                </div>
                                                <p className="comment-text">
                                                    {comment.text}
                                                </p>
                                                <div className="comment-actions">
                                                    <a href="#" className="action-button">👍 Reply</a>
                                                </div>
                                                {comment.userId === getUserId && (
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <Button sx={{ fontSize: '0.7rem', padding: '2px 4px', minWidth: 'auto', height: '24px', }}
                                                            size="small" variant="contained" endIcon={<SendIcon />}
                                                            onClick={() => {
                                                                setEditingCommentId(comment._id);
                                                                setEditedCommentText(comment.text);
                                                            }}
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button sx={{ fontSize: '0.7rem', padding: '2px 4px', minWidth: 'auto', height: '24px', }}
                                                            onClick={() =>
                                                                handleDeleteComment(comment._id)}
                                                            variant="outlined"
                                                            startIcon={
                                                                <DeleteIcon />}
                                                            size="small"
                                                        >
                                                            Eliminar
                                                        </Button>
                                                        <Button sx={{ fontSize: '0.7rem', padding: '2px 4px', minWidth: 'auto', height: '24px', }}
                                                            size="small" variant="outlined" startIcon={<ThumbUpIcon />}
                                                            onClick={() => handleLikeDislike(comment._id, 'like', getUserId, getUsername)}
                                                        >
                                                            Like ({comment.likes || 0})
                                                        </Button>
                                                        <Button sx={{ fontSize: '0.7rem', padding: '2px 4px', minWidth: 'auto', height: '24px', }}
                                                            size="small" variant="outlined" startIcon={<ThumbDownIcon />}
                                                            onClick={() => handleLikeDislike(comment._id, 'dislike', getUserId, getUsername)}
                                                        >
                                                            Dislike ({comment.dislikes || 0})
                                                        </Button>
                                                    </div>
                                                )}

                                                {comment.userId != getUserId && (

                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <Button sx={{ fontSize: '0.7rem', padding: '2px 4px', minWidth: 'auto', height: '24px', }}
                                                            size="small" variant="outlined" startIcon={<ThumbUpIcon />}
                                                            onClick={() => handleLikeDislike(comment._id, 'like', getUserId, getUsername)}
                                                        >
                                                            Like ({comment.likes || 0})
                                                        </Button>
                                                        <Button sx={{ fontSize: '0.7rem', padding: '2px 4px', minWidth: 'auto', height: '24px', }}
                                                            size="small" variant="outlined" startIcon={<ThumbDownIcon />}
                                                            onClick={() => handleLikeDislike(comment._id, 'dislike', getUserId, getUsername)}
                                                        >
                                                            Dislike ({comment.dislikes || 0})
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                ))}
                            </div>
                            <textarea
                                required
                                className="reply-box"
                                placeholder="Escribe un comentario....."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                style={{ width: '60%', height: '80px', fontSize: '14px' }} // Ajusta el tamaño y estilo aquí

                            ></textarea>
                            <Rating
                                name="calificacion"
                                value={Number(calificacion)}
                                onChange={handleRatingChange}
                                precision={1} // Permite seleccionar valores enteros
                                max={5} // Define el máximo de estrellas (1 a 5)
                                sx={{
                                    color: '#f5a623', // Color de las estrellas (ajústalo según tu preferencia)
                                    fontSize: '2rem', // Tamaño de las estrellas
                                    marginBottom: '10px', // Margen inferior si necesitas espacio
                                }}
                            />
                        </div>
                        <div align="center">
                            <button onClick={handleAddComment} className="comment-button">Comentar</button>
                        </div>

                    </Typography>
                </Box>
            </Modal>
        </div >
    );
}


export default ComentariosMusic;