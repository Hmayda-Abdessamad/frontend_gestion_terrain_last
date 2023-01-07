import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
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
  TablePagination, Modal, Box, TextField, FormHelperText, InputLabel, Select,

} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'ville', label: 'Ville', alignRight: false },
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
  const [idv,setIdv]=useState(0)
  const [selectS,setSelectS]=useState('')
  const [namezone,setNamezone]=useState('')

  const [id,setId]=useState(0)
  const [openv, setOpenv] = useState(false);
  const handleOpenv = () => setOpenv(true);
  const handleClosev = () => setOpenv(false);
  const[openedit,SetOpenedit]=useState(null)
  const handleOpeneditee = () => SetOpenedit(true);
  const[openedelete,SetOpendelete]=useState(  null)

  const [namez,setNamez]=useState('')
  function handleOpenedit(id,zone,idVille){

    SetOpenedit(true)
    setNamez(zone)
    setId(id)
    setIdv(idVille)

  }
  function handleOpendelete(nom,id){
    SetOpendelete(true)
    setNamezone(nom)
    setId(id)

    console.log(`${id.toString()}${nom}`)

  }


  const handleCloseedit = () => SetOpenedit(false)
  const handleClosedelete = () => SetOpendelete(false);
  const[zones,setZones]=useState([])
  const[villes,setVilles]=useState([])




  useEffect(()=>{

      fetch("http://localhost:8085/zone")
          .then(res=>res.json())
          .then((result)=>{
            setZones(result);

          })


  },[])



  useEffect(()=>{
    fetch("http://localhost:8085/ville")
        .then(res=>res.json())
        .then((result)=>{
          setVilles(result);
        })
  },[])


  const saveZone =(e)=>{e.preventDefault()


    fetch(
          `http://localhost:8085/zone/add/${idv}`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(nom)
        }).then(()=>
    {
      window.location.reload()
      handleClosev()

    })


  }

  const editzone =(e)=>{e.preventDefault()

    fetch(
        `http://localhost:8085/zone/edit/${id}/${idv}`,{
          method:"Put",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(namez)
        }).then(()=>
    {
      window.location.reload()
      SetOpenedit(false)
    })
  }

  const deletezone =(e)=>{e.preventDefault()
    fetch(
        `http://localhost:8085/zone/delete/${id}`,{
          method:"DELETE",
          headers:{"Content-Type":"application/json"},
        }).then(()=>
    {
      window.location.reload()
      SetOpendelete(false)
    })
  }

  const annuler =(e)=>{e.preventDefault()

    SetOpendelete(false)
  }

  function search(valeur) {
 console.log(valeur)

    if (valeur===0){

      fetch(`http://localhost:8085/zone`, {

      })
          .then(response => response.json())
          .then((result)=>{
            setZones(result);
          })
    }else{
      fetch(`http://localhost:8085/zone/${valeur}`, {

      })
          .then(response => response.json())
          .then((result)=>{
            setZones(result);
          })
    }


  }


  return (
      <>
        <Helmet>
          <title> User | Minimal UI </title>
        </Helmet>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
             Zone
            </Typography>



            <Select


                onChange={(e)=>search(e.target.value)}
                label="Select"
                defaultValue={0}
                style={{width:"250px",backgroundColor:"white"}}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"

            >

              {villes.map((item)=>
                  <MenuItem value={item.id}>{item.ville}</MenuItem>
              )}
              <MenuItem value={0}  >Toutes les zones</MenuItem>
            </Select>




            <Button variant="contained" onClick={handleOpenv} startIcon={<Iconify icon="eva:plus-fill" />}>
              Nouvelle zone
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
                    Ajoutez une zone
                  </Typography>
                  <br/>
                  <TextField required id="outlined-required" label="nom" value={nom} onChange={(e)=>setNom(e.target.value)}/>
                  <br/>
                  <InputLabel id="demo-simple-select-helper-label">Ville</InputLabel>
                  <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={idv}
                      onChange={(e)=>setIdv(e.target.value)}
                      label="Ville"

                  >

                    {villes.map((item)=>
                    <MenuItem value={item.id}>{item.ville}</MenuItem>
                      )}
                  </Select>
                  <FormHelperText>cette zone appartient à quelle ville ?</FormHelperText>
                  <br/> <br/>
                  <Button variant="contained" onClick={saveZone}>Ajouter</Button>

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
                    {zones.map((row) => {

                      const selectedVille = selected.indexOf(idv) !== -1;

                      return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedVille}>


                            <TableCell component="th" scope="row" >
                              <Stack direction="row" alignItems="center" spacing={5}>
                                <Typography variant="subtitle2" style={{marginRight:"20px"}} noWrap>
                                  {row.id}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {row.nom}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {row.ville.ville}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell  component="th" scope="row" padding="none" align="right">

                              <Button variant="contained" color="success" style={{marginRight:"1em"}} onClick={() => handleOpenedit(row.id,row.nom,row.ville.id)}>Modifier</Button>
                              <Button variant="contained" color="error" onClick={() => handleOpendelete(row.nom,row.id)}>Supprimer</Button>
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
            name={namez}
            id={idv}
            onClose={handleCloseedit}aj
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Paper elevation={3}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
                Modifier une zone
              </Typography>
              <br/>
              <TextField required id="outlined-required" label="Required"  value={namez}  onChange={(e)=>setNamez(e.target.value)}/>
              <br/>
              <InputLabel id="demo-simple-select-helper-label">Ville</InputLabel>
              <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                   value={idv}
                  onChange={(e)=>setIdv(e.target.value)}
                  label="Ville"

              >

                {villes.map((item)=>
                    <MenuItem value={item.id}>{item.ville}</MenuItem>
                )}
              </Select>
              <FormHelperText>cette zone appartient à quelle ville ?</FormHelperText>
              <br/> <br/>
              <Button variant="contained" onClick={editzone}>Modifier</Button>

            </Box>

          </Paper>
        </Modal>

        <Modal
            open={openedelete}
            name={namezone}
            id={id}
            onClose={handleClosedelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Paper elevation={3}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
                voulez vous supprimer cette ville ?
              </Typography>
              <br/>
              <TextField required id="outlined-required" label="Required"  value={namezone} />
              <br/> <br/>
              <Button variant="contained" color="error" onClick={deletezone}>Supprimer</Button>
              <Button variant="contained" color="secondary" onClick={annuler}>annuler</Button>

            </Box>

          </Paper>
        </Modal>
      </>
  );
}
