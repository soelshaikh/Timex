import React, { useEffect, useState } from 'react'

const SubTotal1 = (cartData) => {

    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const totalAmount = () =>{
        let price = 0
        cartData.iteam.map((item)=>{
            price += item.product[0].selling_price *item.quantity
        })
        setPrice(price)
        setTotalPrice(price+40)
    }
    useEffect(()=>{
        totalAmount();
    },[cartData])
    
  return (
    <>

        <tfoot>
                                    <tr>
                                        <th>Cart Subtotal</th>
                                        <td>{price}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td><strong>40</strong></td>
                                    </tr>
                                    <tr className="order_total">
                                        <th>Order Total</th>
                                        <td><strong>{totalPrice}</strong></td>
                                    </tr>
                                </tfoot>
    </>
  )
}

export default SubTotal1