import React, { useEffect } from 'react'
import SaleProducts from './SaleProducts'
import { useSellStore } from '@/store/useSellerStore'

const SaleProductsList = () => {

  const { productList, fetchUserProducts, isLoading, error } = useSellStore()

  useEffect(() => {
    console.log("Sales product list mounted, fetching products...")
    fetchUserProducts()
  },[])

  console.log("currnt state", {
    productList,
    isLoading,
    error
  })

  if(isLoading) return <p>Loading...</p>

  // if some error occurs
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Error: {error}</div>
        <button 
          onClick={() => fetchUserProducts()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  //if list is empty
  if (!productList || productList.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 text-lg">No products found</div>
        <p className="text-gray-500 mt-2">Start by adding your first product!</p>
      </div>
    )
  }

  return (
    <div className='grid gap-5 grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {productList.map((product) => (
          <SaleProducts key={product._id} product={product} />
        ))}
    </div>
  )
}

export default SaleProductsList