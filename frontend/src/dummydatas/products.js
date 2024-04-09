export const products = [
  {
    _id: 1,
    product_name: "Lunar Walk",
    modelNo: "127",
    created_at: "2024/07/03", // Date format changed to YYYY/MM/DD
    colors: [
      {
        color: "blue",
        sizes: [
          { size: 39, stock: 3 },
          { size: 41, stock: 7 },
          { size: 42, stock: 2 },
        ],
      },
      {
        color: "green",
        sizes: [
          { size: 39, stock: 1 },
          { size: 41, stock: 1 },
        ],
      },
    ],
    modelNumbers: ["123576"],
    price: 120.0,
    images: ["image1.png"],
  },
  {
    _id: 2,
    product_name: "Trail Explorer",
    modelNo: "128",
    created_at: "2024/08/03", // Date format changed to YYYY/MM/DD
    colors: [
      {
        color: "red",
        sizes: [
          { size: 38, stock: 1 },
          { size: 40, stock: 3 },
        ],
      },
      {
        color: "black",
        sizes: [
          { size: 42, stock: 2 },
          { size: 43, stock: 3 },
        ],
      },
    ],
    modelNumbers: ["123577"],
    price: 130.0,
    images: ["image2.png"],
  },
  {
    _id: 3,
    product_name: "City Sprinter",
    modelNo: "129",
    created_at: "2024/06/02", // Date format changed to YYYY/MM/DD
    colors: [
      {
        color: "white",
        sizes: [
          { size: 37, stock: 1 },
          { size: 39, stock: 8 },
          { size: 41, stock: 5 },
        ],
      },
      {
        color: "yellow",
        sizes: [
          { size: 36, stock: 3 },
          { size: 38, stock: 4 },
        ],
      },
    ],
    modelNumbers: ["123578"],
    price: 110.0,
    images: ["image3.png"],
  },
];
