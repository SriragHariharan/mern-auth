import React from 'react'

function ProductCard({title, price, image}) {
    return (
        <div className="col-12 col-md-3">
            <div className="card p-3 my-2" style={{height:" 26rem"}}>
                <img src={image} className="card-img-top" alt={title} style={{height: "18rem"}} />
                <div className="card-body">
                    <h6 className="card-title">{title}</h6>
                    <h5 className="card-text">₹ {price}</h5>
                </div>
            </div>
        </div>
    )
}

export default ProductCard