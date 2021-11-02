export interface Ticket {
    origin: string;
    origin_name: string;
    destination: string;
    destination_name: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string;
    arrival_time: string;
    carrier: string;
    stops: number;
    price: number;
    initialPrice: number;
};

export type ExchangeRates = 1| 73 | 84;
export type Currency = "rub" | "usd" | "eur";
export type CountOfTransfer = number | "all";

export interface TicketsState {
    tickets: Ticket[];
    filteredTickets: Ticket[];
    loading: boolean;
    error: null | string;
};