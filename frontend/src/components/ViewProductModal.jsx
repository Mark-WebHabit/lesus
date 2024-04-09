import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../app/features/inventorySlice";
import { useDispatch } from "react-redux";
import "../styles/ViewProductModal.css";
import LogoSvg from "../assets/Logo";
const ViewProductModal = ({ handleToggleViewProductModal, viewId }) => {
  const [data, setData] = useState({});
  const [img, setImg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (viewId) {
      async function getProduct() {
        const response = await dispatch(getSingleProduct(viewId));
        setData(response.payload.data);
      }

      getProduct();
    } else {
      setData({});
    }
  }, [viewId]);

  const handleSetSrcImage = (url) => {
    setImg(url);
  };

  const ImageIndicator = ({ url }) => {
    const link = new URL(url);
    const pathname = link.pathname;
    const filename = pathname.split("/").pop(); // 'file.txt'
    const decodedFilename = decodeURIComponent(filename);

    const fileArr = decodedFilename.split("/");
    return (
      <div className="image-indicator" onClick={() => handleSetSrcImage(url)}>
        <span>{fileArr[1]}</span>
      </div>
    );
  };

  return (
    <div className="view-modal-continaer">
      <div className="view-modal-wrapper">
        <div className="view-modal-flex">
          <div className="image-container">
            {img !== "" ? <img src={img} alt="IMAGE" /> : <LogoSvg />}
          </div>
          <div className="view-product">
            <div className="input-wrapper">
              <div className="input">
                <label htmlFor="product-name">Name || Brand</label>
                <p>{data?.product_name?.toUpperCase()}</p>
              </div>
              <div className="input">
                <label htmlFor="price">Price</label>
                <p>{data.price}</p>
              </div>
              <div className="input">
                <label htmlFor="size">Sizes</label>
                <p>
                  {data?._id &&
                    data.colors.map((color, index) => (
                      <React.Fragment key={index}>
                        {color.sizes.map((val, i) => (
                          <React.Fragment key={i}>
                            {val.size + ", "}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                </p>
              </div>
              <div className="input">
                <label htmlFor="color">Colors</label>
                <p>
                  {data?._id &&
                    data.colors.map((color, index) => (
                      <React.Fragment key={index}>
                        {color?.color?.toUpperCase() + ", "}
                      </React.Fragment>
                    ))}
                </p>
              </div>
            </div>
            <div className="button">
              <button
                className="cancel"
                onClick={() => handleToggleViewProductModal()}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
        <div className="image-list">
          {data?._id &&
            (data.images.length > 0
              ? data.images.map((img, i) => (
                  <ImageIndicator key={i} url={img} />
                ))
              : null)}
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
