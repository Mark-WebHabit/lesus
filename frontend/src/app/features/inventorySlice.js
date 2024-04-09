import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../config/instance.js";
import { products } from "../../dummydatas/products.js";
import { throwError } from "../../utilities/error.js";

const initialState = {
  //fetch all the sproducts
  products: [],
  totalStocks: 0,
  criticalItems: [],
  inventoryError: "",
  fetchingStatus: "idle", //idle, loading, error, completed
  //   filter: "today", // week, now, month
  sortedProducts: [],
  sortFilter: "",
  mode: "asc",
};

export const uploadImageProduct = createAsyncThunk(
  "/products/product/mk/img",
  async (data) => {
    try {
      const response = await instance.patch("/products/product/mk/img", data);

      return response.data;
    } catch (error) {
      throwError(error);
    }
  }
);

export const deleteProductImageOne = createAsyncThunk(
  "/products/product/rm/img",
  async (data) => {
    try {
      const response = await instance.patch("/products/product/rm/img", data);

      return response.data;
    } catch (error) {
      throwError(error);
    }
  }
);

export const updateAfterWalkInSell = createAsyncThunk(
  "/products/product/update",
  async (data) => {
    try {
      const response = await instance.patch("/products/product/update", data);

      return response.data;
    } catch (error) {
      throwError(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "/products/:id",
  async (id) => {
    try {
      const response = await instance.get(`/products/${id}`);

      return response.data;
    } catch (error) {
      throwError(error);
    }
  }
);

export const getProductThruModelNumber = createAsyncThunk(
  "products/product/:model",
  async (model) => {
    try {
      const response = await instance.get(`/products/product/${model}`);
      return response.data;
    } catch (error) {
      throwError(error);
    }
  }
);

export const editProduct = createAsyncThunk("/products/edit", async (data) => {
  try {
    const response = await instance.post("/products/edit", data);

    return response.data;
  } catch (error) {
    throwError(error);
  }
});

export const addProduct = createAsyncThunk("/products/add", async (data) => {
  try {
    const response = await instance.post("/products/add", data);
    return response.data;
  } catch (error) {
    throwError(error);
  }
});

// async functions here
export const fetchAllProducts = createAsyncThunk("/products", async () => {
  try {
    const response = await instance.get("/products");
    return response.data;
  } catch (error) {
    throwError(error);
  }
});

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setTotalInventory: (state) => {
      state.totalStocks = 0;
      let count = 0;
      if (state.products?.length) {
        state.products.forEach((product) => {
          product.colors.forEach((color) => {
            color.sizes.forEach((size) => {
              count += size.stock;
            });
          });
        });
      } else {
        count = 0;
      }
      state.totalStocks = count;
    },

    setCriticalItemsm: (state) => {
      const container = [];
      state.products.forEach((product) => {
        let count = 0;

        product.colors.forEach((color) => {
          color.sizes.forEach((size) => {
            count += size.stock;
          });
        });

        const data = { product_name: product.product_name, stocks: count };
        if (data.stocks < 10) {
          container.push(data);
        }
      });

      state.criticalItems = container;
    },

    updateOneObjectProduct: (state, action) => {
      const payload = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product._id === payload._id
      );

      state.products[productIndex] = payload;
      console.log(state.products);
    },

    setSortStateMode: (state, action) => {
      state.mode = action.payload;
    },
    setSortFilter: (state, action) => {
      state.sortFilter = action.payload;
    },

    sortProducts: (state) => {
      if (state.sortFilter == "brand") {
        if (state.mode === "asc") {
          state.products.sort((a, b) =>
            a.product_name.localeCompare(b.product_name)
          );
        } else {
          state.products.sort((a, b) =>
            b.product_name.localeCompare(a.product_name)
          );
        }
      } else if (state.sortFilter == "price") {
        if (state.mode === "asc") {
          state.products.sort((a, b) => a.price - b.price);
        } else {
          state.products.sort((a, b) => b.price - a.price);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});
export const {
  setTotalInventory,
  setSortFilter,
  setSortStateMode,
  setCriticalItemsm,
  setSortedProducts,
  updateOneObjectProduct,
  sortProducts,
} = inventorySlice.actions;
export default inventorySlice.reducer;
