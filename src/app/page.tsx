"use client"

import { useEffect, useState } from "react"

interface ProductsApi {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: any
}

export default function Home() {

  const [products, setProducts] = useState<ProductsApi>([])
  const [counter, setCounter] = useState<number>(5)

  const allProducts = async () => {
    await fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((response) => {
      setProducts(response["products"])
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    allProducts()
  },[])

  const increaseCounter = (/* e: React.MouseEventHandler<HTMLButtonElement>, */ data:number) => {
    setCounter((counter) => counter + data)
  }

  const scrollLoading = (e: UIEvent<HTMLDivElement>) => {
    let divMain = document.querySelector(".screenSize");

    let totalSizeMain = divMain.offsetHeight;
    let currentScroll = e.currentTarget.scrollTop
    currentScroll = currentScroll + 658

    if (totalSizeMain < currentScroll) {
      setTimeout(() =>{
        increaseCounter(5)
      }, 2000)
    }
  }

  return (
    <div className="overflow-y-scroll h-screen" onScroll={scrollLoading}>
      <main className="bg-[#EEEEEE] py-[50px] px-[100px] screenSize">
     {
      products.filter((item: any, index: number) => index < counter).map((product: ProductsApi) => {
        return(
          <>
          <div key={product.id} className="bg-white p-[20px] rounded-[4px] border-[#E5E5E5] border-[1px] grid grid-cols-3">
  
      <div className="col-span-2 border-r-[1px] border-[#bbbbbb] mr-[15px]">
        <div className="grid grid-cols-3 gap-[20px]">
          <div style={{'--image-url': `url(${product.thumbnail})`}} 
        className='bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat rounded-[4px]' >
          </div>
          <div className="col-span-2">
            <div className="font-[700] text-[18px] mb-[7px]">{product.title}</div>
            <div>
              <span>Stars</span><span>310</span>
            </div>
            <div>
             <div className="text-[14px] text-[#848484] mb-[10px] mt-[7px]">{product.brand}</div>
            </div>
            <div className="text-[16px] font-[500]">
              {product.description}
            </div>
          </div>
        </div>
      </div>
  
      <div>
        <div>
          <span className="text-[20px] font-[700]">${product.price}</span>
          <span className="text-[#c1607a] text-[14px] font-[500] ml-[10px]">{product.discountPercentage}%</span>
        </div>
        <div className="text-[#499e63] text-[16px] font-[700] mt-[10px] mb-[15px]">Free shipping</div>
        <a href="#">
          <div className="text-center w-[100%] bg-[#006bed] p-[5px] rounded-[3px] mb-[10px] text-white font-[500]">Details</div>
        </a>
        <a href="#" className="text-[#006bed]">
          <div className="text-center p-[5px] rounded-[3px] border-[2px] border-[#006BED] font-[500]">Add to whishlist</div>
        </a>
      </div>
  
    </div>
        </>
        )
      })
     }
    </main>
    </div>
    
  )
}
