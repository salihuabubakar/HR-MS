import React from 'react'
import NoRecordFoudImage from "../assets/img/no-record.png";

const NoAvailableData = () => {
  return (
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 mx-auto d-block">
      <img src={NoRecordFoudImage} alt="no-record-image" />
    </div>
  );
}
export default NoAvailableData;
