import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTickets} from "../../API/ticketsListAPI";
import { CountOfTransfer, Currency } from "../../types/ticket";
import { ExchangeRates, Ticket, TicketsState } from "../../types/ticket";

const initialState: TicketsState = {
  tickets: [],  //билеты от сервера
  filteredTickets: [],
  loading: false,
  error: null
}

const changeCurrenceFun = (state: TicketsState, multiplier: ExchangeRates) => {  //смена и округление валюты
  state.filteredTickets.forEach(ticket => {  //билеты, что сейчас на экране
    ticket.price = Math.round(ticket.initialPrice * 1 / multiplier * 100) / 100;
  });
  state.tickets.forEach(ticket => {  //неактивные билеты
    ticket.price = Math.round(ticket.initialPrice * 1 / multiplier * 100) / 100;
  });
}

const ticketsListSlice = createSlice({
  name: "ticketsList",
  initialState,
  reducers: {
    changeCurrence(state, action: PayloadAction<Currency>) {
      if (action.payload === "rub") {
        changeCurrenceFun(state, 1);
        }
      if (action.payload === "usd") {
        changeCurrenceFun(state, 73);
      }
      if (action.payload === "eur") {
        changeCurrenceFun(state, 84);
      }
      },
      transferFilter(state, action: PayloadAction<CountOfTransfer>) {
        if (action.payload === "all") {
          state.filteredTickets = state.tickets;
        } else {
          const ticketsArr = state.tickets;
          state.filteredTickets = [];

          ticketsArr.forEach((ticket: Ticket) => {
            ticket.stops === action.payload && state.filteredTickets.push(ticket);
          })
        }
      }
  },
  extraReducers: {
    [fetchTickets.fulfilled.type]: (state, action: PayloadAction<Ticket[]>) => {
      state.loading = false;
      state.tickets = state.filteredTickets = action.payload;
    },
    [fetchTickets.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchTickets.rejected.type]: (state, action: PayloadAction<string>) => {
       state.loading = false;
       state.error = action.payload;
    }
  }
})

export default ticketsListSlice.reducer; 
export const {changeCurrence, transferFilter} = ticketsListSlice.actions;