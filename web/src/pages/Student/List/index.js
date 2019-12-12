import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Header, ButtonConfirm } from '../Store/styles';
import { Container } from './styles';

import api from '../../../services/api';

export default function List() {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  const classes = useStyles();
  return (
    <Container>
      <Header>
        <h2>Gerenciando alunos</h2>
        <div>
          <ButtonConfirm onClick="handleAdd">
            <div>
              <MdAdd />
              <span>Cadastrar</span>
            </div>
          </ButtonConfirm>

          <Input name="find" placeholder="buscar aluno" />
        </div>
      </Header>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NOME</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>IDADE</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>
                <Link to={`/Student/Store/${student.id}/M`}>Editar</Link>
              </TableCell>
              <TableCell>
                <Link to={`/Student/Store/${student.id}/D`}>Excluir</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
