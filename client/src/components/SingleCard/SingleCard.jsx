import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteButton from "../DeleteButton";
import "./SingleCard.css";
import MembersSelect from "../MembersSelect";
import AlbumsSelect from "../AlbumsSelect";
import AlbumType from "../AlbumType";

const SingleCard = ({ photocards, setPhotocards }) => {
  const { id } = useParams();
  const card = photocards.find((card) => card._id === id);

  const [edicion, setEdicion] = useState(false);
  const [member_name, setMemberName] = useState('');
  const [album, setAlbum] = useState('');
  const [event, setEvent] = useState('');
  const [album_type, setAlbumType] = useState('');
  const [year, setYear] = useState('');
  const [version, setVersion] = useState('');
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (card) {
      setMemberName(card.member_name)
      setAlbum(card.album);
      setEvent(card.event);
      setAlbumType(card.album_type);
      setYear(card.year);
      setVersion(card.version);
    }
  }, [card])

  const editItem = (data, id) => {
    console.log(data);
    axios
      .put(process.env.REACT_APP_BACKEND + "/api/straykids/" + card._id, data)
      .then((result) => result.data)
      .then((response) => {
        console.log(response);
        setPhotocards(photocards.map(card => card._id === id ? response : card))
      })
      .catch((error) => {
        console.log(error);
        if (error !== undefined) {
          setErrors(error);
        }
      });
  };

  const handleChangeEdit = (e) => {
    setEdicion(e.target.checked);
    if (e.target.checked === false) {
      if (
        member_name !== card.member_name ||
        album !== card.album ||
        event !== card.event ||
        album_type !== card.album_type ||
        year !== card.year ||
        version !== card.version
      ) {
        let data = {
          member_name,
          album,
          event,
          album_type,
          year,
          version,
        };
        editItem(data, card._id);
      }
    }
  };

  if (!card) return <p>Not found</p>;

  return (
    <div className="singlecard-container mt-5 col-auto">
      <div className="inner-card-container card">
        <div className="row g-0">
          <div className="img-container col-auto">
            <img
              style={{ maxHeight: '600px'}}
              src={"http://localhost:8000/files/" + card.url}
              className="img-fluid rounded-start h-100 object-fit-cover"
              alt="photocard"
            />
          </div>
          <div className="col-auto px-4">
            <div className="card-body d-flex flex-column gap-1">
              <h3 className="card-title text-center">
                {card.member_name} - {card.album}
              </h3>
              <div>
                <form onSubmit={editItem}>
                  {/*Nombre del miembro*/}
                  <div className="mb-1 mt-1">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label mb-1"
                    >
                      Member Name
                    </label>
                    <MembersSelect
                      disabled={!edicion}
                      value={member_name}
                      onChange={setMemberName}
                    />
                  </div>

                  {/* Album */}
                  <div className="mb-1">
                    <label>Album:</label>
                    <AlbumsSelect
                      disabled={!edicion}
                      value={album}
                      onChange={setAlbum}
                    />
                  </div>

                  {/* Year */}
                  <div className="mb-1">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label mb-1"
                    >
                      Year
                    </label>
                    <input
                      disabled={!edicion}
                      className="form-control"
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    ></input>
                  </div>

                  {/* Evento */}
                  <div className="mb-1">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label mb-1"
                    >
                      Event:
                    </label>
                    <input
                      disabled={!edicion}
                      className="form-control"
                      id="formGroupExampleInput"
                      type="text"
                      value={event}
                      onChange={(e) => setEvent(e.target.value)}
                    ></input>
                  </div>

                  {/* Album Type */}

                  <div className="mb-1">
                    <label>Album Type:</label>
                    <AlbumType
                      disabled={!edicion}
                      value={album_type}
                      onChange={setAlbumType}
                    />
                  </div>

                  {/* Album version*/}
                  <div className="mb-1">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label mb-1"
                    >
                      Version
                    </label>
                    <input
                      disabled={!edicion}
                      className="form-control"
                      type="text"
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                    ></input>
                  </div>
                </form>
                {errors ? (
                  <p style={{ color: "red", fontSize: 10 }}>
                    {JSON.stringify(errors)}
                  </p>
                ) : null}
              </div>
              <div>
                <div className="d-flex justify-content-center align-items-center gap-3 my-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={(e) => handleChangeEdit(e)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Edit photocard
                    </label>
                  </div>
                  <DeleteButton
                    photocard={card}
                    photocards={photocards}
                    setPhotocards={setPhotocards}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
