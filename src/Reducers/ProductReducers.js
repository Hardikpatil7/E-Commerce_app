const initialState = {
    products: JSON.parse(localStorage.getItem('products')) || []
  };
  
  const productReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADD_PRODUCT':
        const newProductsAdd = [...state.products, action.payload];
        localStorage.setItem('products', JSON.stringify(newProductsAdd));
        return {
          ...state,
          products: newProductsAdd
        };
      case 'EDIT_PRODUCT':
        const editedProducts = state.products.map(product => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
        localStorage.setItem('products', JSON.stringify(editedProducts));
        return {
          ...state,
          products: editedProducts
        };
      case 'DELETE_PRODUCT':
        const filteredProducts = state.products.filter(product => product.id !== action.payload);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
        return {
          ...state,
          products: filteredProducts
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  