import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap  } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';

import {
  Box,
  Button,
  Container, IconButton,
  InputLabel, Link,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Card from '@mui/material/Card';
import { Map } from 'react-feather';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Iconify from '../components/iconify';





// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [showMap, setShowMap] = useState(false);
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



  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [name,setName]=useState('')
  const [image,setImage]=useState()
  const [adresse,setAdresse]=useState('')
  const [longitude,setLongitude]=useState()
  const [latitude,setLatitude]=useState()
  const [rank,setRank]=useState()
  const [type,setType]=useState('')
  const [etat,setEtat]=useState('')
  const [description,setDescription]=useState('')
  const [typeSal,setTypeSal]=useState('')
  const [tarif,setTarif]=useState()
  const[zones,setZones]=useState([])
  const[terrains,setTerrains]=useState([])
  const[clubs,setClubs]=useState([])
  const [zone,setZone]=useState()
  const [club,setClub]=useState()

  useEffect(()=>{
    fetch("http://localhost:8085/zone")
        .then(res=>res.json())
        .then((result)=>{
          setZones(result);
        })
  },[])

  useEffect(()=>{
    fetch("http://localhost:8085/terrain")
        .then(res=>res.json())
        .then((result)=>{
          setTerrains(result);
        })
  },[])

  useEffect(()=>{
    fetch("http://localhost:8085/club")
        .then(res=>res.json())
        .then((result)=>{
          setClubs(result);
        })
  },[])



  const saveTerrain =(e)=>{e.preventDefault()

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('adresse', adresse);
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    formData.append('type', type);
    formData.append('rank', rank);
    formData.append('etat', etat);
    formData.append('description', description);
    formData.append('typeSal', typeSal);
    formData.append('tarif', tarif);
    formData.append('club', club);
    formData.append('zone', zone);

    fetch(
        `http://localhost:8085/terrain/add`,{
          method:"POST",

          body:formData
        }).then(()=>
    {
      handleCloseAdd()
      window.location.reload()

    })


  }



    if(showMap){
         return <Map/>;
    }




  return (
    <>
      <Helmet>
        <title> Gestion des terrains  </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Terrain
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
            <Button variant="contained" onClick={handleOpenAdd}  direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" startIcon={<Iconify icon="eva:plus-fill" />}>
             Nouveau terrain
            </Button>
          <Modal
              open={openAdd}
              onClose={handleCloseAdd}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Paper elevation={3}>
              <Box sx={style} component="form"  noValidate autoComplete="off">

                <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
                  Ajouter un Terrain
                </Typography>
                <br/>

                <div style={{display:"flex" ,flexDirection:"row" ,marginBottom:"1em"}}>
                <TextField required label="Nom" style={{display:"block",marginRight:"1em"}} value={name} onChange={(e)=>setName(e.target.value)}  />
                <TextField required  label="Adresse" style={{display:"block"}}  value={adresse} onChange={(e)=>setAdresse(e.target.value)}/>
                </div>

                <div style={{display:"flex" ,flexDirection:"row",marginBottom:"1em"}}>
                  <TextField required label="Longitude" type={"number"} style={{display:"block",marginRight:"1em"}} value={longitude} onChange={(e)=>setLongitude(e.target.value)} />
                  <TextField required  label="Latitude" type={"number"} style={{display:"block"}} value={latitude} onChange={(e)=>setLatitude(e.target.value)} />
                </div>

                <div style={{display:"flex" ,flexDirection:"row" ,marginBottom:"1em"}}>
                  <TextField required label="Rank" type={"number"}  style={{display:"block" ,marginRight:"1em"}}  value={rank} onChange={(e)=>setRank(e.target.value)} />
                  <TextField required  label="Type" style={{display:"block"}} value={type} onChange={(e)=>setType(e.target.value)}/>
                </div>

                <div style={{display:"flex" ,flexDirection:"row" ,marginBottom:"1em"}}>
                  <TextField required label="Etat" style={{display:"block" ,marginRight:"1em"}}  value={etat} onChange={(e)=>setEtat(e.target.value)} />
                  <TextField required  label="Description" style={{display:"block"}} value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>

                <div style={{display:"flex" ,flexDirection:"row" ,marginBottom:"1em"}}>
                  <TextField required label="Type de Salle" style={{display:"block" ,marginRight:"1em"}} value={typeSal} onChange={(e)=>setTypeSal(e.target.value)}  />
                  <TextField required  label="Tarif" type={"number"} style={{display:"block"}} value={tarif} onChange={(e)=>setTarif(e.target.value)} />
                </div>
                <div style={{display:"flex" ,flexDirection:"row" ,marginBottom:"1em"}}>
                  <InputLabel style={{display:"block" ,marginRight:"5em",marginLeft:"3em"}}>Zone</InputLabel>
                  <InputLabel style={{display:"block",marginLeft:"3em"}}>Club</InputLabel>
                </div>
                <div style={{display:"flex" ,flexDirection:"row" ,marginBottom:"1em"}}>

                  <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" label="zone" style={{marginRight:"1em",display:"block",width:"20ch"}}
                          value={zone}
                          onChange={(e)=>setZone(e.target.value)}>

                    {zones.map((item)=>
                        <MenuItem value={item.id}>{item.nom}</MenuItem>
                    )}

                  </Select>

                  <Select  label="zone"   helperText="Please select your currency" style={{display:"block",width:"20ch"}}
                           value={club}
                           onChange={(e)=>setClub(e.target.value)}>

                    {clubs.map((item)=>
                        <MenuItem value={item.id}>{item.nom}</MenuItem>
                    )}

                  </Select>
                </div>
                <input type="file"   onChange={(e)=>{setImage(e.target.files[0])}}/>

                <br/>
                <Button variant="contained"  onClick={saveTerrain}>Ajouter</Button>

              </Box>

            </Paper>
          </Modal>

        </Stack>
       
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '16px' }}>
      {terrains.map((item) => (
        <Card sx={{ maxWidth: 500 }} style={{
        padding: "5px"
      }}>
        <CardMedia
        sx={{ height: 300,backgroundColor:"#ede7f6" }}
        image="http://localhost:8085/club/2"
        title="green iguana"
        />
        <CardContent sx={{ height: 200 ,backgroundColor:"#d1c4e9"}} >

        <Typography variant="body2" >
       <p>

         <strong>Nom:</strong>           {item.nom}<br/>
         <strong>rank:</strong>           {item.rank}<br/>
         <strong>description:</strong>           {item.description}<br/>
         <strong>tarif:</strong>           {item.tarif}<br/>
         <strong>typeSal:</strong>           {item.typeSal}<br/>
         <strong>etat:</strong>           {item.etat}<br/>
         <strong>type:</strong>           {item.type}<br/>

       </p>

        </Typography>

        </CardContent>
        <CardActions sx={{backgroundColor:"#9575cd"}}>
          <Link to="dashboard/app">
          <button   onClick={() => setShowMap(!showMap)} style={{backgroundColor: "#4caf50",color: "white",padding: "15px 32px",border: "none",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <FontAwesomeIcon icon={faMap} />
            Position
          </button>
          </Link>
        </CardActions>
        </Card>
        ))}
        </div>


      </Container>
    </>
  );
}
