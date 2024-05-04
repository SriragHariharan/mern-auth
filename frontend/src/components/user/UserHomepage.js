import React from 'react'
import useGetProducts from '../../hooks/useGetProducts'
import ProductCard from './ProductCard';

function UserHomepage() {
    const [products, error] = useGetProducts();

  return (
    <div className="container">
        <h1 className="text-warning text-center my-5">Products Showcase</h1>
        <div className="row">
                {
                    (!error && products.length!==0) && products?.map(prod => <ProductCard title={prod?.title} price={prod?.price} image={prod?.image} /> )
                }
                {
                    error && <h1 className="text-center my-5">{error}</h1>
                }
        </div>

        <hr />
        <h4 className="text-center my-5 text-secondary">Made with ❤️ by <i> Srirag H</i> </h4>
    </div>
  )
}

export default UserHomepage