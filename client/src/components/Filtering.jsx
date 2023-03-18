import React from "react";
import MembersSelect from './MembersSelect'

const Filtering = ({ members, memberFilter, setMemberFilter }) => {
  return (
    <>
      <div className="text-center">
        <div className="dropdown mx-auto">
          <MembersSelect value={memberFilter} onChange={setMemberFilter} />
        </div>
      </div>
    </>
  );
};

export default Filtering;
