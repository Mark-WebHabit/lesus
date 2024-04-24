import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/AddModal.css";
import LogoSvg from "../assets/Logo";
import { addProduct, fetchAllProducts } from "../app/features/inventorySlice";
import storage from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProductModal = ({ handleToggleAddProductModal }) => {
  const [datas, setDatas] = useState({
    productName: "",
    modelNo: "",
    color: "",
    size: "",
    price: "",
    images: [],
  });
  const [error, setError] = useState("");
  const [images, setImages] = useState([])
  const [img, setImg] = useState("") 
  const [uploading, setUploading] = useState(false)
  const [src, setSrc] = useState("")
  const dispatch = useDispatch();
  const inputRef = useRef()

  const handleChange = (e) => {
    setError("");
    setDatas({ ...datas, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { productName, modelNo, color, size, price } = datas;
    if (
      productName === "" ||
      size === "" ||
      color === "" ||
      price === "" ||
      modelNo === ""
    ) {
      setError("All fields are required");
      return;
    }

    if (isNaN(price)) {
      setError("Invalid Price Format");
      return;
    }

    await dispatch(
      addProduct({
        productName: productName.toLowerCase(),
        modelNo,
        color: color.toLowerCase(),
        size,
        price,
        images: images || []
      })
    );
    await dispatch(fetchAllProducts());
    setDatas({
      productName: "",
      modelNo: "",
      color: "",
      size: "",
      price: "",
      images: [],
    });
    setImages([])
    setError("");
    handleToggleAddProductModal();
  };

  // extra component
  const ImageIndicator = ({ url }) => {
    return (
      <div className="image-indicator">
        <span onClick={() => setSrc(url)}>file.jpg</span>
        <img src="/images/x.png" alt="close" />
      </div>
    );
  };

  const handleFileChange = (e) => {
    const confirmation = confirm("Upload Image?");

    if (!confirmation) return;

    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  }

  useEffect(() => {
    if(img){
      async function uplaod () {
        setUploading(true)

          const storageRef = ref(storage, `images/${img.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, img);
        const imageUrl = await getDownloadURL(snapshot.ref);

        if (imageUrl) {
          setImages((prev) => [...prev, imageUrl])
          setImg("")
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setUploading(false);
      }
          
        
      }
      uplaod()
    }
  },[img])

  useEffect(() => {console.log(images);}, [images])
  return (
    <div className="add-modal-continaer">
      <div className="add-modal-wrapper">
        <div className="add-modal-flex">
          <div className="image-container">
           {src === ""  && <LogoSvg />}
           {src !== "" && <img src={src} alt="" />}
            <input type="file" name="" id="" accept="jpg, jpeg" ref={inputRef} onChange={handleFileChange}/>
            <button className="upload" onClick={() => inputRef.current.click()}>{uploading ? "UPLOADING" : "UPLAOD"}</button>
          </div>
          <div className="add-product">
            <p className="error">{error}</p>

            <div className="input-wrapper">
              <div className="input">
                <label htmlFor="product-name">Name || Brand</label>
                <input
                  maxLength={100}
                  type="text"
                  name="productName"
                  id="product-name"
                  onChange={handleChange}
                  value={datas.productName}
                />
              </div>
              <div className="input">
                <label htmlFor="price">Price</label>
                <input
                  maxLength={100}
                  type="text"
                  name="price"
                  id="price"
                  onChange={handleChange}
                  value={datas.price}
                />
              </div>
              <div className="input">
                <label htmlFor="size">Model Number</label>
                <input
                  maxLength={100}
                  type="text"
                  name="modelNo"
                  id="size"
                  onChange={handleChange}
                  value={datas.modelNo}
                />
              </div>
              <div className="input half">
                <label htmlFor="size">Size</label>
                <input
                  maxLength={100}
                  type="text"
                  name="size"
                  id="size"
                  value={datas.size}
                  onChange={handleChange}
                />
              </div>

              <div className="input half">
                <label htmlFor="color">Color</label>
                <input
                  maxLength={100}
                  type="text"
                  name="color"
                  id="color"
                  value={datas.color}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button">
              <button className="cancel" onClick={handleToggleAddProductModal}>
                CANCEL
              </button>
              <button className="submit" onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        {images && images.length !== 0 && <div className="image-list">
          {images.map((image, i) => <ImageIndicator key={i} url={image} />)}
          </div>}
      </div>
    </div>
  );
};

export default AddProductModal;
