import { Modal } from "antd";
import AnnotationCanvas from "../../../AnnotationCanvas/AnnotationCanvas";

const AnnotationModalDesignPool = ({ setanotationModal, anotationModal,selectedDesign }) => {
  const handleCloseCreateModal = () => {
    setanotationModal(false);
  };

  return (
    <div className="annotationmodal">
      <Modal
        title=""
        visible={anotationModal}
        onCancel={handleCloseCreateModal}
        centered
      >
        <AnnotationCanvas 
         selectedDesign={selectedDesign}
        />
      </Modal>
    </div>
  );
};

export default AnnotationModalDesignPool;
