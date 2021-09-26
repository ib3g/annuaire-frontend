import React, { useEffect, useState }from "react";
import Inscription from "../components/body/HomeScreen/InscriptionSection/Inscription";
import Menubar from "../components/body/HomeScreen/Navbar/Menubar";
import CardProfile from "../components/body/HomeScreen/profils/CardProfile";
import Footer from "../components/footer/Footer";
import "../components/body/HomeScreen/profils/PopularProfil.css";
import "./ProfilList.css";
import {Box, CssBaseline, Container, Typography, Grid, Card, CardContent} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { getDataAPI } from '../utils/fetchData';
import axios from "axios";

function ProfilList(props) {

  const [users, setUsers] = useState()
  const [page, setPage] = useState()
  const [total, setTotal] = useState()
  const [size, setSize] = useState(2)
  const [loading, setLoading] = useState(true)

  // const getProfil = async (id) => {
  //   const res = await axios.get(`https://babaata.eviltech.org/api/users/pagination?size=${size}&page=${1}`)
  //   setUsers(res.data?.users)
  //   setTotal(11)
  //   setLoading(false)
  // }

  useEffect(async()=>{

 
      if (props.location.profile) {
        setUsers(props.location.profile)
      } else {
        const res = await axios.get(`https://babaata.eviltech.org/api/users/pagination?size=${size}&page=${page}`)
      
        setUsers(res?.data?.users?.data)
        setTotal(11)
        setLoading(false)
      }
    

  },[page])

  // if (!users?.data) {
  //   if (props.location.profile) {
  //     setUsers(props.location.profile)
  //   } else {
  //     getProfil(props.match.params.profilsId)
  //   }
  // }
  console.log(users)
  console.log(total);

  const pageCout = Math.ceil(loading ? <p>...loading</p> : 10 / size); 

  return (
    <div className="profil_list">
      <Typography>
      <Menubar />
      <Inscription margin="2%" text="Tous les profils" />
      <div className="card__section items">
        <div className="row justify-content-center">
          {!users ? <div className="d-flex justify-content-center"><i className="fa fa-spinner fa-spin fa-2x"></i></div> : ''} 
          {
            users?.map((u) => (
              <div className="col-6 col-lg-3" key={u.id_utilisateur}>
                <CardProfile image="./images/souare.jpeg" color="#326FB4" profile={u}/>
              </div>
            ))
          }
          
        </div>
      </div>
      </Typography>
      <CssBaseline />
      <Container component={Box} py={3}>
        <Pagination 
        count={pageCout}                                         
        color="secondary"
        variant="outlined"
        showFirstButton={true}
        showLastButton={true}
        onClick={(e, value)=>setPage(parseInt(value))}
        />
      </Container>

        <Footer />
    </div>
  );
}

export default ProfilList;



// import React, { useState } from "react";
// import Inscription from "../components/body/HomeScreen/InscriptionSection/Inscription";
// import Menubar from "../components/body/HomeScreen/Navbar/Menubar";
// import CardProfile from "../components/body/HomeScreen/profils/CardProfile";
// import Footer from "../components/footer/Footer";
// import "../components/body/HomeScreen/profils/PopularProfil.css";
// import "./ProfilList.css";
// import ReactPaginate from 'react-paginate'
// import { getDataAPI } from '../utils/fetchData';

// function ProfilList(props) {
//   const [users, setUsers] = useState();

//   const getProfil = async (id) => {
//     const res = await getDataAPI("users/pagination");
//     setUsers(res.data?.users?.data);
//   };

//   if (!users){
//     if (props.location.profile) {
//       setUsers(props.location.profile);
//     } else {
//       getProfil(props.match.params.profilsId);
//     }
//   }

//   const [pageNumber, setPageNumber] = useState(0)

//   const usersPerPage = 8;
//   const pagesVisited = pageNumber * usersPerPage;

  
//   const pageCout = Math.ceil(users?.length / usersPerPage); 

//   const changePage = ({selected}) => {
//     setPageNumber(selected)
//   }

//   return (
//     <div className="profil_list">
//       <Menubar />
//       <Inscription margin="2%" text="Tous les profils" />
//       <div className="card__section items">
//         <div className="row justify-content-center">
//           {!users ? <div className="d-flex justify-content-center"><i className="fa fa-spinner fa-spin fa-2x"></i></div> : ''} 
//           {
//             users
//             ?.slice(pagesVisited, pagesVisited + usersPerPage)
//             ?.map((u) => (
//               <div className="col-6 col-lg-3" key={u.id_utilisateur}>
//                 <CardProfile image="./images/souare.jpeg" color="#326FB4" profile={u}/>
//               </div>
//             ))
//           }
          
//         </div>
//       </div>
//         <div className="d-flex justify-content-center">
//         <ReactPaginate 
//           previousLabel={"Previous"}
//           nextLabel={"Next"}  
//           pageCount={pageCout}
//           onPageChange={changePage}
//           containerClassName={'paginationBttns'}
//           disabledClassName={"paginationDisabled"}
//           activeClassName={"paginationActive"}
//           onPageActive={"active"}
//           disableInitialCallback={"disable"}
//       />
//         </div>
//       <Footer />
//     </div>
//   );
// }

// export default ProfilList;
