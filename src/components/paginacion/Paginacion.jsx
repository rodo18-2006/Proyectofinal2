import React, { useState } from 'react';

const Paginacion = ({ itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="d-flex justify-content-center my-4">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className="btn btn-outline-primary mx-1"
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginacion;
