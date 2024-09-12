export const color = [
  "white",
  "red",
  "black",
  "blue",
  "green",
  "yellow",
  "pink",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "red", label: "Red" },
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "pink", label: "Pink" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
];

export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-999", label: "$0 to $999" },
      { value: "1000-4999", label: "$1000 to $4999" },
      { value: "5000-9999", label: "$5000 to $9999" },
      { value: "10000-19999", label: "$10000 to $19999" },
      { value: "20000-4999", label: "$20000 to $49999" },
      { value: "50000-99999", label: "$50000 to $99999" },
      { value: "1Lac & Above", label: "1Lac & Above" },
    ],
  },
  {
    id: "discount",
    name: "Discount",
    options: [
      { value: "10", label: "10% & Above" },
      { value: "20", label: "20% & Above" },
      { value: "30", label: "30% & Above" },
      { value: "40", label: "40% & Above" },
      { value: "50", label: "50% & Above" },
      { value: "60", label: "60% & Above" },
      { value: "70", label: "70% & Above" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in stock", label: "In Stock" },
      { value: "out of stock", label: "Out of Stock" },
    ],
  },
];
