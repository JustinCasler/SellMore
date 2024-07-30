import React from 'react';

interface PopupPreviewProps {
  message: string;
  color: string;
}

const PopupPreview: React.FC<PopupPreviewProps> = ({ message, color }) => {
  return (
    <div
      style={{
        width: '300px',
        height: '100px',
        backgroundColor: color,
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <p style={{ margin: '0', fontSize: '18px' }}>{message}</p>
      <span
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          cursor: 'pointer',
          color: '#007bff',
          fontSize: '14px'
        }}
      >
        &times;
      </span>
    </div>
  );
};

export default PopupPreview;