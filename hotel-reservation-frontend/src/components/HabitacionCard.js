import React, { useState } from 'react';

const HabitacionCard = ({ habitacion, isSelected, onClick }) => {
    return (
        <button
            style={{
                ...styles.card,
                ...(isSelected ? styles.selected : {}),
            }}
            onClick={onClick}
        >
            <h3>{habitacion.tipo}</h3>
            <p>Número: {habitacion.numero}</p>
            <p>Precio: ${habitacion.precio}</p>
            <p>{habitacion.disponible ? 'Disponible' : 'No disponible'}</p>
        </button>
    );
};

const styles = {
    card: {
        border: '1px solid #8B4513',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        backgroundColor: '#F5DEB3',
        color: '#8B4513',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
    },
    selected: {
        backgroundColor: '#A0522D',
        color: '#FFF',
    },
};

export default HabitacionCard;
