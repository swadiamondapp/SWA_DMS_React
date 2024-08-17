import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Rhino3dmLoader } from "three-stdlib";
import * as THREE from "three";

const ThreeDViewer = ({ url }) => {
  const sceneRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 0, 200]);

  useEffect(() => {
    const loader = new Rhino3dmLoader();
    loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@7.14.0/");

    if (url) {
      loader.load(url, (object) => {
        if (sceneRef.current) {
          // Clear previous object
          while (sceneRef.current.children.length) {
            sceneRef.current.remove(sceneRef.current.children[0]);
          }

          // Add new object
          sceneRef.current.add(object);

          // Manually assign colors/materials if not present
          object.traverse((child) => {
            if (child.isMesh) {
              // Check if material is present; otherwise, assign a default material
              if (!child.material) {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x00ff00, // Default green color, change as needed
                });
              }
              // Example: assigning color based on a condition
              // child.material.color.setHex(0xff0000); // Red color
            }
          });

          // Compute bounding box to get model dimensions
          const box = new THREE.Box3().setFromObject(object);
          const size = new THREE.Vector3();
          const center = new THREE.Vector3();
          box.getSize(size);
          box.getCenter(center);

          // Center the object
          object.position.x -= center.x;
          object.position.y -= center.y;
          object.position.z -= center.z;

          // Adjust camera position based on object size
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = 45 * (Math.PI / 180); // Field of view from the camera prop

          // Calculate a distance based on the max dimension
          const zoomFactor = 9.9; // Increase this value to zoom out more
          const cameraZ = (maxDim / 2 / Math.tan(fov / 2)) * zoomFactor;
          setCameraPosition([0, 0, cameraZ]);
        }
      });
    }
  }, [url]);

  return (
    <Canvas
      className="cursor-pointer"
      frameloop="demand"
      camera={{ position: cameraPosition, fov: 45, near: 0.1, far: 2000 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls
        autoRotate
        enableZoom={true}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        enablePan={false}
      />
      <scene ref={sceneRef} />
    </Canvas>
  );
};

export default ThreeDViewer;
