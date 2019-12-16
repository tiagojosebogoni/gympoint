import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import { Link, Redirect } from 'react-router-dom';
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

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <Header>
        <h2>Gerenciando alunos</h2>
        <div>
          <ButtonConfirm onClick={() => {}}>
            <div>
              <MdAdd />
              <span>Cadastrar</span>
            </div>
          </ButtonConfirm>
        </div>
      </Header>
      <div className="grid">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TÍTULO</TableCell>
              <TableCell>DURAÇÃO</TableCell>
              <TableCell>VALOR p/ MÊS</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map(plan => (
              <TableRow key={plan.id}>
                <TableCell component="th" scope="row">
                  {plan.title}
                </TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell>
                  <Link className="edit" to={`/Plan/Store/${plan.id}/M`}> Editar </Link>
                </TableCell>
                <TableCell>
                  <Link className="delete" to={`/Plan/Store/${plan.id}/D`}> Excluir </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
