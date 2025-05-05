export const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col h-full w-full rounded-2xl">
      <div className="relative h-[75%] w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-fit"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-400 text-white font-bold text-sm shadow-md rounded-full">
            -{product.discountPercentage}%
          </div>
        )}
      </div>
      <div className="flex flex-col h-[25%] w-full p-5 bg-gradient-to-br from-purple-50 to-pink-50">
        <span className="text-base text-purple-600 font-medium mb-1">
          {product.brand}
        </span>
        <h1 className="text-base font-bold text-gray-800 mb-2">
          {product.name}
        </h1>
        <div className="flex items-center mb-4">
          <span className="text-base font-bold text-purple-800">
            ₹{product.price.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-base text-gray-400 font-normal line-through ml-3">
                ₹{product.originalPrice}
              </span>
              <span className="text-base text-pink-500 font-medium ml-2">
                Save {product.discountPercentage}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
