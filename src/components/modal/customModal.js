import React, { useState, useEffect } from 'react';
import { Modal, Fade, Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { gql, useQuery, useMutation } from '@apollo/client';
import useStyles from './styles';
import LoadingModal from './loadingModal';

const GET_REPOSITORY= gql`
        query repository($name: String!){
            viewer{
                repository(name: $name){
                    id
                    name
                    owner{
                        login
                    }
                    stargazers(first: 100){
                        totalCount
                        nodes{
                            id
                        }
                    }
                }
            }
        }
    `;

const PUT_STAR=gql`
    mutation addStar($starrableId: String!, $clientMutationId: String!){
        addStar(input:{
            starrableId: $starrableId
            clientMutationId: $clientMutationId
        }) {
            clientMutationId
        }
    }
`


export default function CustomModal(props){
    const name = props.name;
    const classes = useStyles();
    const [putStar, { data: dataStar, loading: loadingStar, error: mutationError }] = useMutation(PUT_STAR);
    const { loading, error, data } = useQuery(GET_REPOSITORY,{
        variables: { name },
    });
    const [star, setStar] = useState(false);
    const [qtyStars, setQtyStars]  = useState();

    useEffect(() => {
        if(!loading){
            setStar(data.viewer.repository.stargazers.nodes.find(id => id.id === props.id) ? true : false)
            setQtyStars(data.viewer.repository.stargazers.nodes.length);
        }
    }, [loading]);

    
    const buttonStar = <Button variant="contained" color="primary" onClick={(event) => {
        event.preventDefault();
        putStar({variables: {clientMutationId: props.id,  starrableId: data.viewer.repository.id}});
        if(!mutationError){
            setStar(true);
            setQtyStars(qtyStars + 1);
        }
    }}>
        Atribuir estrela a esse repositório
    </Button>;
    
    if(loading) return <LoadingModal open={props.open} handleClose={props.handleClose}/>;

        return(
            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={props.open}
                    onClose={props.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={props.open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">{data.viewer.repository.name}</h2>
                            <p id="transition-modal-description">Owner: {data.viewer.repository.owner.login}</p>
                            <p id="transition-modal-description">Estrelas: {qtyStars}</p>
                            {star ? 'Você já atribuiu uma estrela a esse repositório' :  buttonStar}
                        </div>
                    </Fade>
                </Modal>
        );
}