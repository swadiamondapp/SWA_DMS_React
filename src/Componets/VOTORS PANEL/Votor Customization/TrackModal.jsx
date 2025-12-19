/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";

const TrackModal = ({ open, onClose, data }) => {
  if (!open) return null;

  return (
    <div className="track_overlay">
      <div className="track_modal">
        <div className="track_header">
          <h3>Track</h3>
          <IoClose onClick={onClose} className="close_icon" />
        </div>

        <div className="track_body">
          <div className="timeline">
            {data.length === 0 ? (
              <p className="no_track">No progress yet</p>
            ) : (
              data.map((item, index) => (
                <div key={index} className="timeline_item">
                  <div className={`timeline_dot ${item.type}`} />

                  <div className="timeline_content">
                    <p className="timeline_title">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default TrackModal