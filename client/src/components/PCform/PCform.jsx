import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./PCform.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import MembersSelect from '../MembersSelect'
import AlbumsSelect from '../AlbumsSelect'
import AlbumType from '../AlbumType'

const PCform = ({ photocards, setPhotocards}) => {
  const [member_name, setMemberName] = useState("default");
  const [album, setAlbum] = useState("default");
  const [event, setEvent] = useState("");
  const [album_type, setAlbumType] = useState("default");
  const [year, setYear] = useState("");
  const [version, setVersion] = useState("");
  const [image, setImage] = useState({
    /* setState de la imagen */ preview: "",
    data: "",
  });
  const [errors, setErrors] = useState("");

  const [cookies] = useCookies(["usertoken"]);

  

  const navigate = useNavigate();

  const messageAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your submission has been saved",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cookies.usertoken)
      return setErrors({
        unauthenticated: { message: "You must be logged in" },
      });

    let data = JSON.stringify({
      member_name: member_name,
      album: album,
      evento: event,
      album_type: album_type,
      year: year,
      version: version,
    });

    let formData = new FormData();
    formData.append("file", image.data);
    formData.append("data", data); //El data en comillas viene del back-end, el data sin comillas es de la linea 19

    console.log(data);

    axios
      .post(process.env.REACT_APP_BACKEND + "/api/straykids", formData)
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        setErrors({});
        setMemberName("default");
        setAlbum("default");
        setEvent("");
        setAlbumType("default");
        setYear("");
        setVersion("");
        setImage("");
        messageAlert();

        setPhotocards([...photocards, result])
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        if (error.response.data.errors !== undefined) {
          setErrors(error.response.data.errors);
        }
      });
  };

  /*Funcion para manejar la subida de fotos*/
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <>
      <div className="contenedorcito mt-3">
        <div className="concha2">
          <form onSubmit={handleSubmit}>
            {/* Imagen */}
            <div clasName="mb-4">
              <label htmlFor="formFile" className="form-label">
                Image:
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                name="file"
                onChange={handleFileChange}
                accept="image/jpg, image/jpeg, image/png"
              ></input>
            </div>
            {errors.url ? (
              <p style={{ color: "red", fontSize: 10 }}>{errors.url.message}</p>
            ) : null}

            {/*Nombre del miembro*/}
            <div className="mb-3 mt-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Member Name
              </label>
              <MembersSelect value={member_name} onChange={setMemberName} />
            </div>
            {errors.member_name ? (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.member_name.message}
              </p>
            ) : null}

            {/* Album */}
            <div className="mb-3">
              <label>Album:</label>
              <AlbumsSelect value={album} onChange={setAlbum} />
            </div>
            {errors.album ? (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.album.message}
              </p>
            ) : null}

            {/* Year */}
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Year
              </label>
              <input
                className="form-control"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></input>
            </div>
            {errors.year ? (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.year.message}
              </p>
            ) : null}

            {/* Evento */}
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Event:
              </label>
              <input
                className="form-control"
                id="formGroupExampleInput"
                type="text"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
              ></input>
            </div>
            {errors.evento ? (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.evento.message}
              </p>
            ) : null}

            {/* Album Type */}

            <div className="mb-3">
              <label>Album Type:</label> 
              <AlbumType value={album_type} onChange={setAlbumType} />
            </div>
            
            {errors.album_type ? (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.album_type.message}
              </p>
            ) : null}

            {/* Album version*/}
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Version
              </label>
              <input
                className="form-control"
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              ></input>
            </div>
            {errors.version ? (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.version.message}
              </p>
            ) : null}

            {/* ERRORES DEL BACK-END */}
            {errors.unauthenticated ? (
              <p style={{ color: "red", fontSize: 10 }}>
                {errors.unauthenticated.message}
              </p>
            ) : null}
            <div className="mt-3 text-center">
              <button type="submit" className="btn btn-primary">
                Add PC
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PCform;
