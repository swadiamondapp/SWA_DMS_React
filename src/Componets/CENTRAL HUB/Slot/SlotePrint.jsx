import React, { forwardRef } from "react";
import "./SlotePrint.css";

const SlotePrint = forwardRef(({ slotView }, ref) => {
  return (
    <div ref={ref} className="print-renders-product">
      <div className="print-slot-modal-container">
        <div className="print-slot-container">
          <table className="print-custom-table print-single-border">
            <thead>
              <tr>
                <th className="print-column-header">Product ID</th>
                <th className="print-column-header">Created date</th>
                <th className="print-column-header">Product Category</th>
                <th className="print-column-header">Weight</th>
              </tr>
            </thead>
            <tbody className="print-table-body">
              {slotView.map((item, index) =>
                item.caddesigns.map((design, designIndex) => (
                  <tr key={`${index}-${designIndex}`}>
                    <td className="print-table-cell">{design.designcode}</td>
                    <td className="print-table-cell">{design.created_at}</td>
                    <td className="print-table-cell">
                      {design.product_category.join(", ")}
                    </td>
                    <td className="print-table-cell">{design.approx_metal_weight} Gram</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default SlotePrint;
