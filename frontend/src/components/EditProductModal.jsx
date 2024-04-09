import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "../styles/EditProductModal.css";
import LogoSvg from "../assets/Logo";
import {
  getSingleProduct,
  updateOneObjectProduct,
  editProduct,
  deleteProductImageOne,
  uploadImageProduct,
} from "../app/features/inventorySlice";
import storage from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ButProductModal = ({ handleToggleEditProductModal, editId }) => {
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState({
    productName: "",
    price: "",
    color: "",
    size: "",
    stock: "",
  });
  const uploadRef = useRef();
  const [image, setImage] = useState();

  const [productImage, setProductImage] = useState([]);
  const [url, setUrl] = useState("");
  const [uploading, setuploading] = useState(false);
  const dispatch = useDispatch();
  const cancelRef = useRef();
  // extra component

  const handleImageFileChange = (e) => {
    const confirmation = confirm("Upload Image?");

    if (!confirmation) return;

    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!image && !image?.name) return;

    async function uploadImage() {
      setuploading(true);
      const storageRef = ref(storage, `images/${image.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);

        if (imageUrl) {
          const response = await dispatch(
            uploadImageProduct({
              _id: product._id,
              url: imageUrl,
            })
          );

          if (response.payload) {
            setImage("");
            setProduct(response.payload);
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setuploading(false);
      }
    }

    uploadImage();
  }, [image]);

  const ImageIndicator = ({ url }) => {
    const link = new URL(url);
    const pathname = link.pathname;
    const filename = pathname.split("/").pop(); // 'file.txt'
    const decodedFilename = decodeURIComponent(filename);

    const fileArr = decodedFilename.split("/");
    return (
      <div className="image-indicator">
        <span onClick={() => setUrl(url)}>{fileArr[1]}</span>
        <img
          src="/images/x.png"
          alt="close"
          onClick={() => handleDeleteImage(url)}
        />
      </div>
    );
  };

  useEffect(() => {
    if (editId) {
      async function getProduct() {
        const response = await dispatch(getSingleProduct(editId));
        setProduct(response.payload.data);
      }

      getProduct();
    } else {
      setProduct({});
    }
  }, []);

  useEffect(() => {
    if (!product) return;
    // Set inputs using the product data, ensuring all values are defined
    setInputs({
      productName: product.product_name || "",
      price: product.price?.toString() || "", // Convert price to string; ensure it's not undefined
      color: product.colors?.[0]?.color,
      size: product.colors?.[0]?.sizes?.[0]?.size || "",
      stock: product.colors?.[0]?.sizes?.[0]?.stock?.toString() || "", // Convert stock to string; ensure it's not undefined
    });
    setProductImage(product.images || []);
  }, [product]);

  useEffect(() => {
    if (!inputs.color) return;

    const size = product.colors.find((item) => item.color == inputs.color);
    setInputs({
      ...inputs,
      ["size"]: size.sizes[0].size,
      ["stock"]: size.sizes[0].stock,
    });
  }, [inputs.color]);

  useEffect(() => {
    if (!inputs.size || !inputs.color) return;

    // set stock
    const colorArrIndex = product.colors.findIndex(
      (color) => color.color === inputs.color
    );

    const targetColorObj = product.colors[colorArrIndex];
    const targetSize = targetColorObj.sizes.findIndex(
      (size) => size.size === inputs.size
    );
    setInputs({ ...inputs, ["stock"]: targetColorObj.sizes[targetSize].stock });
  }, [inputs.size]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((oldVal) => ({
      ...oldVal,
      [name]: value,
    }));
  };

  const handleRemoveColor = () => {
    if (!inputs.color) return;

    const confirmation = confirm(
      "Do you want to delete color " + inputs.color + "?"
    );

    if (!confirmation) return;

    let newProduct = product.colors.filter(
      (color) => color.color !== inputs.color
    );
    newProduct = { ...product, ["colors"]: newProduct };
    setProduct(newProduct);
  };

  const handleSubmit = async () => {
    if (product.colors.length === 0) {
      const confirmation = confirm(
        "Since there is no variation left the product will be removed"
      );
      if (!confirmation) {
        return;
      }
    }
    const confirmation = confirm(
      "Do you wat to continue updating the product?"
    );

    if (!confirmation) return;

    // set stock
    const colorArrIndex = product.colors.findIndex(
      (color) => color.color === inputs.color
    );

    const targetColorObj = product.colors[colorArrIndex];
    const targetSize = targetColorObj.sizes.findIndex(
      (size) => size.size === inputs.size
    );
    targetColorObj.sizes[targetSize].stock = inputs.stock;

    product.colors[colorArrIndex] = targetColorObj;

    // set price
    product.price = inputs.price;
    product.product_name = inputs.productName;
    try {
      const response = await dispatch(
        editProduct({
          id: product._id,
          product_name: product.product_name,
          colors: product.colors,
          price: product.price,
          images: product.images,
        })
      );

      if (response.payload.data) {
        setProduct(response.payload.data);
        const confirmation = confirm(
          "Product Updated, Do you want to edit this product again?"
        );

        if (confirmation) {
          return;
        } else {
          setInputs({
            productName: "",
            price: "",
            color: "",
            size: "",
            stock: "",
          });
          dispatch(updateOneObjectProduct(product));
          cancelRef.current.click();
        }
      }
    } catch (error) {
      if (error?.response?.data) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handleDeleteImage = async (url) => {
    if (!product?._id) return;
    if (!url) return;

    const confirmation = confirm("Do you want to delete this image?");
    if (!confirmation) return;
    try {
      const response = await dispatch(
        deleteProductImageOne({ _id: product?._id, url })
      );

      setProduct(response.payload);
    } catch (error) {
      if (error?.response?.data) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="add-modal-continaer">
      <div className="add-modal-wrapper">
        <div className="add-modal-flex">
          <div className="image-container">
            {!url && <LogoSvg />}
            {url && <img src={url} alt="" />}
            <input
              type="file"
              name=""
              id=""
              accept="jpg, jpeg"
              onChange={handleImageFileChange}
              ref={uploadRef}
            />
            <button
              className="upload"
              onClick={() => uploadRef.current.click()}
              disabled={uploading}
            >
              {uploading ? "UPLOADING..." : "UPLOAD"}
            </button>
          </div>
          <div className="add-product">
            <div className="input-wrapper">
              <div className="input">
                <label htmlFor="product">Product || Name</label>
                <input
                  maxLength={100}
                  type="text"
                  name="productName"
                  id="product"
                  placeholder=""
                  value={inputs.productName}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <label htmlFor="price">Price</label>
                <input
                  maxLength={100}
                  type="number"
                  name="price"
                  id="price"
                  value={inputs.price}
                  onChange={handleChange}
                />
              </div>

              <div className="input colors">
                <label htmlFor="color">COLORS:</label>
                <select onChange={handleChange} name="color">
                  {product &&
                    product?._id &&
                    product.colors.map((color, i) => (
                      <option value={color.color} key={i}>
                        {color?.color?.toUpperCase()}
                      </option>
                    ))}
                </select>
                <button onClick={handleRemoveColor}>DEL</button>
              </div>
              <div className="input colors half">
                <label htmlFor="colors">SIZES:</label>
                <select name="size" id="" onChange={handleChange}>
                  {product &&
                    product?._id &&
                    inputs.color &&
                    product.colors
                      .find((color) => color.color === inputs.color)
                      ?.sizes.map((size, i) => (
                        <option value={size.size} key={i}>
                          {size?.size?.toUpperCase()}
                        </option>
                      ))}
                </select>
              </div>
              <div className="input half">
                <label htmlFor="color">STOCKS:</label>
                <input
                  type="number"
                  name="stock"
                  id=""
                  value={inputs.stock}
                  onChange={handleChange}
                  disabled={!inputs.size}
                />
              </div>
            </div>
            <div className="button">
              <button
                className="cancel"
                onClick={() => handleToggleEditProductModal()}
                ref={cancelRef}
              >
                CANCEL
              </button>
              <button className="submit" onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        {product && product?.images?.length !== 0 && (
          <div className="image-list">
            {typeof productImage == "object" &&
              productImage?.length &&
              productImage.map((image, i) => (
                <ImageIndicator key={i} url={image} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ButProductModal;
