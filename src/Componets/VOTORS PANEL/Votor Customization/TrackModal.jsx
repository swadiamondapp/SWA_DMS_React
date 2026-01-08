/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";

const TrackModal = ({ open, onClose, data }) => {
  if (!open) return null;

 const orderDetails = data?.order_details || {};
  const trackingSteps = Array.isArray(data?.tracking) ? data?.tracking : [];

  /* ---------- helpers ---------- */
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-GB") : "-";

  const formatTime = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  return (
   <div className="track_overlay">
      <div className="track_modal">
        {/* HEADER */}
        <div className="track_header">
          <h3>Track</h3>
          <IoClose onClick={onClose} className="close_icon" />
        </div>

        <div className="track_body">
          {/* ORDER INFO */}
          <div className="track_order_info">
            <div className="info_item">
              <span>Due Date</span>
              <strong>{formatDate(orderDetails.due_date)}</strong>
            </div>

            <div className="info_item">
              <span>Created Date</span>
              <strong>{formatDate(orderDetails.created_at)}</strong>
            </div>

            <div className="info_item">
              <span>Created Time</span>
              <strong>{formatTime(orderDetails.created_at)}</strong>
            </div>
          </div>

          {/* TIMELINE */}
         {/* TIMELINE */}
<div className="timeline">
  {trackingSteps.length === 0 ? (
    <p className="no_track">No progress yet</p>
  ) : (
    trackingSteps.map((step) => (
      <div key={step.step_no} className="timeline_item">
        <div className="timeline_dot" />

        <div className="timeline_content">
          {/* STEP TITLE */}
          <p className="timeline_title">
            Step {step.step_no}: {step.title}
          </p>

          {/* STEP META */}
          <div className="timeline_meta">
            <span>
              <strong>Due:</strong> {formatDate(step.due_date)}
            </span>

            <span>
              <strong>Updated:</strong>{" "}
              {formatDate(step.created_at)} •{" "}
              {formatTime(step.created_at)}
            </span>
          </div>
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