import { Modal } from "antd";
import AnnotationCanvas from "../../../AnnotationCanvas/AnnotationCanvas";

const AnnotationModalDesignPool = ({
  setanotationModal,
  anotationModal,
  selectedDesign,
  setSuccessModalOpen,
  setSuccessMessage,
  setData
}) => {
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
          setSuccessModalOpen={setSuccessModalOpen}
          setSuccessMessage={setSuccessMessage}
          setanotationModal={setanotationModal}
          setData={setData}
        />
      </Modal>
    </div>
  );
};

export default AnnotationModalDesignPool;
