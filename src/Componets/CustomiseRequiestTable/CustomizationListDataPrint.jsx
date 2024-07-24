import React, { forwardRef } from 'react'

const CustomizationListDataPrint =forwardRef(({ clickedProducts }, ref) => {
    return (
      <div ref={ref} className="Print_table">
        {/* Your component JSX */}
        <table style={{borderRadius:"10px"}}  className="Print_table_table">
          <thead>
            <tr>
              <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Date</th>
              <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Customization ID</th>
              <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Outlet</th>
              <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Mobile number	</th>
              <th style={{border:"1px solid black", fontSize:"14px",padding:"10px"}}>Product type</th>
            </tr>
          </thead>
          <tbody>
            {clickedProducts.map(product => (
              <tr style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} key={product.slotnumber}>
                <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>{product.created_at}</td>
                <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>{product.customizationcode}</td>
                <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>{product.outlet}</td>
                <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>{product.mobile_number}</td>
                <td style={{border:"1px solid black", fontSize:"14px",padding:"10px"}} className='print_span'>{product.product_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
  

export default CustomizationListDataPrint
