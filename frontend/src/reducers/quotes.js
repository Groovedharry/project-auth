import { createSlice } from "@reduxjs/toolkit";

const quotes = createSlice({
  name: "quotes",
  initialState: {
    items: [
      {
        id: 1,
        message: "Be yourself, everyone else is already taken - Oscar Wilde ",
      },
      {
        id: 2,
        message: "There is nothing permanent except change - Heraclitus ",
      },
      { id: 3, message: "Every moment is a fresh beginning - T.S. Elliot" },
      {
        id: 4,
        message:
          "Attitude is a little thing that makes a big difference - Winston Churchill",
      },
    ],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default quotes;
