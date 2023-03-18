import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Filtering from "./Filtering";

const PhotocardsList = ({ photocards }) => {
  const [memberFilter, setMemberFilter] = useState("default");

  const members = [
    "Bang Chan",
    "Changbin",
    "Felix",
    "Han",
    "Hyunjin",
    "I.N",
    "Lee Know",
    "Seungmin",
  ];

  const filteredPhotocards =
    memberFilter !== "default"
      ? photocards.filter((card) => card.member_name === memberFilter)
      : photocards;

  return (
    <>
      <div>
        <div className="d-flex justify-content-center align-items-center gap-3 my-3">
          <h2 className="text-center my-2" style={{ color: "black" }}>
            All photocards
          </h2>
          <Filtering
            members={members}
            memberFilter={memberFilter}
            setMemberFilter={setMemberFilter}
          />
        </div>

        {filteredPhotocards.length === 0 && (
          <div className="alert alert-danger col-lg-6 mx-auto text-center">
            There's no photocards available.
          </div>
        )}
        <div className="card-group col-lg-8 mx-auto">
          {filteredPhotocards.map((item) => (
            <div className="col-xs-6 col-sm-4 col-md-3" key={"PC" + item._id}>
              <div className="card my-3">
                <img
                  src={"http://localhost:8000/files/" + item.url}
                  className="card-img-top"
                  alt={item.member_name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.member_name}</h5>
                  <p className="card-text">
                    {item.album} ({item.year})
                  </p>
                  <Link
                    to={`/photocard/${item._id}`}
                    className="btn btn-secondary col-12"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PhotocardsList;
