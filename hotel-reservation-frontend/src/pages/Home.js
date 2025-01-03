import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitacionCard from '../components/HabitacionCard';

const Home = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [selectedHabitacion, setSelectedHabitacion] = useState(null);
    const [fechaLlegada, setFechaLlegada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [numPersonas, setNumPersonas] = useState(1);
    const [clienteNombre, setClienteNombre] = useState('');
    const [clienteEmail, setClienteEmail] = useState('');
    const [clienteTelefono, setClienteTelefono] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/habitaciones/')
            .then(response => setHabitaciones(response.data.filter(h => h.disponible)))
            .catch(error => console.error(error));
    }, []);

    const handleReservar = async () => {
        if (!selectedHabitacion || !fechaLlegada || !fechaSalida || !clienteNombre || !clienteEmail || !clienteTelefono) {
            alert('Por favor, completa todos los campos y selecciona una habitación.');
            return;
        }

        try {
            // Crear el cliente
            const clienteResponse = await axios.post('http://localhost:8000/api/clientes/', {
                nombre: clienteNombre,
                email: clienteEmail,
                telefono: clienteTelefono,
            });

            // Crear la reserva
            const reservaResponse = await axios.post('http://localhost:8000/api/reservas/', {
                cliente: clienteResponse.data.id,
                habitacion: selectedHabitacion.id,
                fecha_inicio: fechaLlegada,
                fecha_fin: fechaSalida,
                numero_personas: numPersonas,
            });

            // Actualizar la disponibilidad de la habitación
            await axios.patch(`http://localhost:8000/api/habitaciones/${selectedHabitacion.id}/`, {
                disponible: false,
            });

            alert('Reserva realizada con éxito.');
            setSelectedHabitacion(null);
            setFechaLlegada('');
            setFechaSalida('');
            setNumPersonas(1);
            setClienteNombre('');
            setClienteEmail('');
            setClienteTelefono('');

            // Actualizar la lista de habitaciones disponibles
            const updatedHabitaciones = habitaciones.filter(h => h.id !== selectedHabitacion.id);
            setHabitaciones(updatedHabitaciones);
        } catch (error) {
            console.error(error);
            alert('Hubo un error al realizar la reserva.');
        }
    };

    const handleClickHabitacion = (habitacion) => {
        setSelectedHabitacion(habitacion);
    };

    const handleDoubleClickHabitacion = () => {
        setSelectedHabitacion(null);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bienvenido al Hotel Marrón</h1>

            {/* Barra de datos del cliente */}
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={clienteNombre}
                    onChange={(e) => setClienteNombre(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={clienteEmail}
                    onChange={(e) => setClienteEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="tel"
                    placeholder="Teléfono"
                    value={clienteTelefono}
                    onChange={(e) => setClienteTelefono(e.target.value)}
                    style={styles.input}
                />
            </div>

            {/* Inputs para fechas y número de personas */}
            <div style={styles.inputContainer}>
                <input
                    type="date"
                    placeholder="Fecha de llegada"
                    value={fechaLlegada}
                    onChange={(e) => setFechaLlegada(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="date"
                    placeholder="Fecha de salida"
                    value={fechaSalida}
                    onChange={(e) => setFechaSalida(e.target.value)}
                    style={styles.input}
                />
                <select
                    value={numPersonas}
                    onChange={(e) => setNumPersonas(e.target.value)}
                    style={styles.select}
                >
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} persona(s)</option>
                    ))}
                </select>
            </div>

            {/* Letrero "Habitaciones" */}
            <h2 style={styles.subtitle}>Habitaciones</h2>

            {/* Lista de habitaciones */}
            <div style={styles.grid}>
                {habitaciones.map(habitacion => (
                    <HabitacionCard
                        key={habitacion.id}
                        habitacion={habitacion}
                        isSelected={selectedHabitacion?.id === habitacion.id}
                        onClick={() => handleClickHabitacion(habitacion)}
                        onDoubleClick={handleDoubleClickHabitacion}
                    />
                ))}
            </div>

            {/* Botón de reserva */}
            <button style={styles.reservarButton} onClick={handleReservar}>
                Reservar
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#D2B48C',
        minHeight: '100vh',
        textAlign: 'center',
    },
    title: {
        color: '#8B4513',
        marginBottom: '20px',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #8B4513',
        backgroundColor: '#F5DEB3',
        color: '#8B4513',
    },
    select: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #8B4513',
        backgroundColor: '#F5DEB3',
        color: '#8B4513',
    },
    subtitle: {
        color: '#8B4513',
        marginBottom: '20px',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px',
    },
    reservarButton: {
        padding: '10px 20px',
        backgroundColor: '#8B4513',
        color: '#FFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#A0522D',
        },
    },
};

export default Home;
