import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';

import React, {useEffect, useState} from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination, Modal, Box, TextField,

} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'id', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'logo', label: 'logo', alignRight: false },
    { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
    display: "flex",
    flexDirection: "column"
};
export default function UserPage() {
  const [open, setOpen] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

    const [nom,setNom]=useState('')
    const [nameville,setNameville]=useState('')

    const [id,setId]=useState(0)
    const [openv, setOpenv] = useState(false);
    const handleOpenv = () => setOpenv(true);
    const handleClosev = () => setOpenv(false);

    const[openedit,SetOpenedit]=useState(null)
    const handleOpeneditee = () => SetOpenedit(true);
    const[openedelete,SetOpendelete]=useState(null)


    function handleOpenedit(id,ville){
        SetOpenedit(true)
        setNameville(ville)
        setId(id)

        console.log(`${id.toString()}${ville}`)

    }
    function handleOpendelete(id,ville){
        SetOpendelete(true)
        setNameville(ville)
        setId(id)

        console.log(`${id.toString()}${ville}`)

    }


    const handleCloseedit = () => SetOpenedit(false)
    const handleClosedelete = () => SetOpendelete(false);
    const[villes,setVilles]=useState([])

    useEffect(()=>{
        fetch("http://localhost:8085/club")
            .then(res=>res.json())
            .then((result)=>{
                setVilles(result);
            })
        },[])

    const [image,setImage]=useState()

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setImage(fileUploaded);

    };


    const saveVille =(e)=>{e.preventDefault()
        const formData = new FormData();
        formData.append('name', nom);
        formData.append('image', image);

     fetch(
     "http://localhost:8085/club/add",{
        method:"POST",
        body:formData
     }).then(()=>
    {
        window.location.reload()

   console.log("nouveau club ajouté")

        handleClosev()
 })

  }

    const editville =(e)=>{e.preventDefault()

        fetch(
            `http://localhost:8085/club/edit/${id}`,{
                method:"Put",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(nameville)
            }).then(()=>
        {
            window.location.reload()
            console.log({id})
            SetOpenedit(false)

        })

    }

    const deleteville =(e)=>{e.preventDefault()

        fetch(
            `http://localhost:8085/club/delete/${id}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},

            }).then(()=>
        {
            window.location.reload()
            console.log({id})
            SetOpendelete(false)

        })

    }

    const annuler =(e)=>{e.preventDefault()
            console.log({id})
            SetOpendelete(false)
    }

  function handleOpenMenu2(id){
        console.log(id)
      setOpen(true)
  }







  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Club
          </Typography>
          <Button variant="contained" onClick={handleOpenv} startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau Club
          </Button>



          <Modal
              open={openv}
              onClose={handleClosev}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Paper elevation={3}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
               Ajouter un Club
              </Typography>
              <br/>
              <TextField required id="outlined-required" label="Required" value={nom} onChange={(e)=>setNom(e.target.value)}/>
              <br/>
                <input type="file"   onChange={(e)=>{setImage(e.target.files[0])}}/>
                <br/> <br/>
              <Button variant="contained" onClick={saveVille}>Ajouter</Button>

            </Box>

            </Paper>
          </Modal>
        </Stack>



        <Card>


          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }} style={{padding:"1em"}}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={villes.length}
                  numSelected={selected.length}
                />
                <TableBody>
                  {villes.map((row) => {
                    const { id, nom } = row;
                    const selectedVille = selected.indexOf(nom) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedVille}>


                          <TableCell component="th" scope="row" padding="1em">
                              <Stack direction="row" alignItems="center" spacing={5}>
                                  <Typography variant="subtitle2" style={{marginRight:"20px"}} noWrap>
                                      {id}
                                  </Typography>
                              </Stack>
                          </TableCell>

                        <TableCell component="th" scope="row" padding="1em">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {nom}
                            </Typography>
                          </Stack>
                        </TableCell>
                          <TableCell component="th" scope="row" padding="1em">

                              {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                  <img style={{ borderRadius: '40%'}}
                                       src={`http://localhost:8085/club/${row.imageData.id}`}
                              id="club_img"
                                  width="200"/>

                          </TableCell>

                        <TableCell  component="th" scope="row" padding="none" align="right">

                            <Button variant="contained" color="success" style={{marginRight:"1em"}} onClick={() => handleOpenedit(row.id,row.nom)}>Modifier</Button>
                            <Button variant="contained" color="error" onClick={() => handleOpendelete(row.id,row.nom)}>Supprimer</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                </TableBody>


              </Table>
            </TableContainer>
          </Scrollbar>


        </Card>
      </Container>


        <Modal
            open={openedit}
            name={nameville}
            onClose={handleCloseedit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper elevation={3}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
                        Modifier un Club
                    </Typography>
                    <br/>
                    <TextField required id="outlined-required" label="Required"  value={nameville} onChange={(e)=>setNameville(e.target.value)}/>
                    <br/> <br/>
                    <Button variant="contained" onClick={editville}>Modifier</Button>

                </Box>

            </Paper>
        </Modal>
        <Modal
            open={openedelete}
            name={nameville}
            onClose={handleClosedelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper elevation={3}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
                        voulez vous supprimer ce Club ?
                    </Typography>
                    <br/>
                    <TextField required id="outlined-required" label="Required"  value={nameville} onChange={(e)=>setNameville(e.target.value)}/>
                    <br/> <br/>
                    <Button variant="contained" color="error" onClick={deleteville}>Supprimer</Button>
                    <Button variant="contained" color="secondary" onClick={annuler}>annuler</Button>

                </Box>

            </Paper>
        </Modal>
    </>
  );
}
