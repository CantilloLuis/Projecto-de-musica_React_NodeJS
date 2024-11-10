import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        titulo: '',
        nombreArtista: '',
        duracion: '',
        urlImagen: '',
        likes: 0,
    });
    const [audioFile, setAudioFile] = React.useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Maneja los cambios en los inputs de texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Maneja el cambio en el input de audio
    const handleAudioChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('titulo', formData.titulo);
        data.append('nombreArtista', formData.nombreArtista);
        data.append('duracion', formData.duracion);
        data.append('urlImagen', formData.urlImagen);
        data.append('likes', formData.likes);
        data.append('audio', audioFile);

        try {
            const response = await fetch('http://localhost:3001/api/music/enviarMusic', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                alert('Canción subida con éxito');
                setFormData({ titulo: '', nombreArtista: '', duracion: '', urlImagen: '', likes: 0 });
                setAudioFile(null);
                handleClose(); // Cerrar el modal después de enviar
                window.location.reload();

            } else {
                alert('Hubo un error al subir la canción');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Error al subir la canción');
        }
    };

    return (
        <div>
            <li><i className="bx bxs-plus-square"></i><a href="#" onClick={handleOpen}>Subir Musica</a></li>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center" gutterBottom>
                        Subir Canción
                    </Typography>

                    <TextField
                        label="Título de la musica"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Nombre del Artista"
                        name="nombreArtista"
                        value={formData.nombreArtista}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Duración de la musica"
                        name="duracion"
                        value={formData.duracion}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="URL de la Imagen de la musica"
                        name="urlImagen"
                        value={formData.urlImagen}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                        Subir Archivo de Audio
                        <input type="file" accept="audio/*" hidden onChange={handleAudioChange} required />
                    </Button>

                    {/* Mostrar nombre del archivo seleccionado */}
                    {audioFile && (
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Archivo seleccionado: {audioFile.name}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                        Subir Canción
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
