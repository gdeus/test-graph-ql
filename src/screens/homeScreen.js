import React, { useState, useEffect } from 'react';
import { gql, useQuery, refetch } from '@apollo/client';
import { makeStyles, Typography, CircularProgress, Button } from '@material-ui/core';
import CustomCard from '../components/customCard/customCard'
import FormNewRepo from '../components/formNewRepo';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
    },
    circularBar:{
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        justify: 'center',
    },
    userInfo:{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },
    userImage:{
        width: 100,
        height: 100
    }
}));

const GET_REPOSITORES= gql`
      query {
        viewer {
          id  
          login
          avatarUrl
          repositories(first: 100){
            nodes{
              id
              name
              createdAt
            }
          }  
       }
      }
    `;


export default function HomeScreen(){
    const { loading, error, data, refetch, onCompleted } = useQuery(GET_REPOSITORES);
    const [newRepo, setNewRepo] = useState(false);
    const classes = useStyles();
    const [reload, setReload] = useState(false);
    const [resultInsert, setResultInsert] = useState();

    useEffect(() => {
        if(reload){
            console.log('dentro do if do reload');
                window.location.reload(false);
                refetch();
            setReload(false);
        }
    }, [reload]);

    useEffect(() => {
        
    }, [resultInsert]);
    
    if(loading){
        return(
            <div className={classes.circularBar} >
                <CircularProgress />
            </div>
        );
    } else {
        return(
            <div className={classes.root}>
                <div className={classes.userInfo}>
                    <img className={classes.userImage} src={data.viewer.avatarUrl}/>
                    <Typography>
                        {data.viewer.login}
                    </Typography>
                </div>
                <div>
                <Button variant="contained" color="primary" onClick={(event) => setNewRepo(true)}>
                    Criar Novo Repositorio
                </Button>
                {newRepo ? <FormNewRepo id={data.viewer.id} setReload={setReload} setResultInsert={setResultInsert}/> : null}
                </div>
                <div style={{display:'flex', direction:'row',justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}> 
                {data.viewer.repositories.nodes.map((repositories, index) => 
                    <div style={{justifyContent: 'center', alignItems: 'center'}}>
                        <CustomCard repositories={repositories} id={data.viewer.id}/>
                    </div> 
                )}
                </div> 
            </div>
        )
    }

    
}