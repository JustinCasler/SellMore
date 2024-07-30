import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to TailAdmin</h1>
      <button
        onClick={() => navigate('/forms/form-layout')}
        className="btn btn-primary"
      >
        Go to Form Layout
      </button>
    </div>
  );
};

export default HomePage;