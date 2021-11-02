import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Ticket } from "../types/ticket";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchAll",
  async(_, thunkAPI) => {
    try {
      const response = await axios.get<Ticket[]>("http://localhost:3000/tickets");
      const tickets = response.data.map((ticket: Ticket) => {
        ticket.initialPrice = ticket.price;  //сохранение начальной цены билета отдельно
        return ({...ticket});
      })
      return tickets;
    }
    catch (e) {
      return thunkAPI.rejectWithValue("Произошла ошибка при загрузке билетов");
    }
  }
)