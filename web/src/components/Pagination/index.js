import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Container } from './styles';

export default function Pagination({ load, pages }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    load('', page);
  }, [page]); //eslint-disable-line

  return (
    <Container>
      <button
        disabled={page <= 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        <MdKeyboardArrowLeft size={40} />
      </button>
      <strong>{page}</strong>
      <button
        onClick={() => {
          setPage(page + 1);
          load('', page);
        }}
        disabled={page === pages}
      >
        <MdKeyboardArrowRight size={40} />
      </button>
    </Container>
  );
}

Pagination.propTypes = {
  load: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
};
