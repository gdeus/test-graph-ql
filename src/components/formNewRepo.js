import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
    },
    fontError: {
      color: 'red'
    }
}));

const NEW_REPOSITORIE= gql`
    mutation create_repo($clientMutationId: String!, $name: String!, $visibility: String!){
        createRepository(input: {
            clientMutationId: $clientMutationId
            name: $name
            visibility: $visibility
        }){
            clientMutationId
        }
  }
`;

export default function FormNewRepo(props){
    const [name, setName] = useState();
    const [visibility, setVisibility] = useState('PUBLIC');
    const [result, setResult] = useState();
    const [newRepo, { loading: mutationLoading, error: mutationError },] = useMutation(NEW_REPOSITORIE);
    const [optionsVisibility, setOptionsVisibility] = useState([
        'PUBLIC',
        'PRIVATE'
    ]);
    const classes = useStyles();

    return(
        <div>
            <FormControl className={classes.formControl}>
                <TextField id="nome" label="Nome" variant="outlined" value={name} inputProps={{ maxLength: 50, minLength: 2}} onChange={e=>setName(e.target.value)}/>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id='input-ano'>Visibilidade</InputLabel>
                <Select 
                labelId='input-ano'
                value={visibility}
                onChange={(visibility)=>{setVisibility(visibility.target.value)}}
                >
                    {optionsVisibility.map((visibility) => 
                        <MenuItem value={visibility}>{visibility}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
            <Button variant="contained" color="primary" onClick={(event) => {
                event.preventDefault();
                newRepo({variables: {clientMutationId: props.id,  name: name, visibility: visibility}});
                if(!mutationLoading && !mutationError){
                    props.setReload(true);
                    setResult(true);
                }
            }}>
                Criar Novo Repositorio
            </Button>
            </FormControl>
            {mutationError && <p>Error :( Please try again</p>}
        </div>
    );
}