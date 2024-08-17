import React, { forwardRef } from 'react';

const ScanTablePrint = forwardRef(({ clickedProducts }, ref) => {
  return (
    <div ref={ref} className="Print_table">
      {/* Your component JSX */}
      <table style={{borderRadius:"10px"}}  className="Print_table_table">
        <thead>
          <tr>
            <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Product ID</th>
            <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Created date</th>
            <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Product Category</th>
            <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Weight</th>
          </tr>
        </thead>
        <tbody>
          {clickedProducts.map(product => (
            <tr style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} key={product.finisheditem.designcode}>
              <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>{product.finisheditem.designcode}</td>
              <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>{product.created_at}</td>
              <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>Missing Field</td>
              <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>Missing Field</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ScanTablePrint;
