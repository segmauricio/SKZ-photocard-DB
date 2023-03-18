import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({photocard, photocards, setPhotocards}) => {
    const navigate = useNavigate()

    const eliminarPhotocard = async (photocardID) => {
        try {
            console.log(`${process.env.REACT_APP_API_URL}/api/straykids/${photocardID}`);
            
            await axios.delete(`${process.env.REACT_APP_BACKEND}/api/straykids/${photocardID}`);
            setPhotocards(photocards.filter(pc => pc._id !== photocard._id))
            navigate('/allPCs')
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            })
        }
    }

    const messageAlert = () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The photocard has been deleted.',
          showConfirmButton: false,
          timer: 2000
        })
      }

    const confirmarEliminar = (photocardID) => {
        Swal.fire({
            title: `Do you want to delete ${photocard.member_name}'s PC?`,
            text: "Remember this is permanent.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want to delete it.'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarPhotocard(photocardID);
                messageAlert();
            }
        })
    }

    return (
        <button className="btn btn-danger ms-2" onClick={() => confirmarEliminar(photocard._id)}>Delete</button>
    )
}

export default DeleteButton