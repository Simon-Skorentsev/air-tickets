import ticketsListReduser, { changeCurrence, transferFilter } from '../ticketsList/ticketsListSlice';
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import TicketsList from "../ticketsList/TicketsList";
import { configureStore } from "@reduxjs/toolkit";
import { Store } from '../../app/store';
import { TicketsState } from '../../types/ticket';

describe("currency and transfers", () => {
    const initialState: TicketsState = {
        tickets: [{
            "origin": "VVO",
            "origin_name": "Владивосток",
            "destination": "TLV",
            "destination_name": "Тель-Авив",
            "departure_date": "12.05.18",
            "departure_time": "16:20",
            "arrival_date": "12.05.18",
            "arrival_time": "22:10",
            "carrier": "TK",
            "stops": 3,
            "price": 12400,
            "initialPrice": 12400
        }],
        filteredTickets: [{
            "origin": "VVO",
            "origin_name": "Владивосток",
            "destination": "TLV",
            "destination_name": "Тель-Авив",
            "departure_date": "12.05.18",
            "departure_time": "16:20",
            "arrival_date": "12.05.18",
            "arrival_time": "22:10",
            "carrier": "TK",
            "stops": 3,
            "price": 12400,
            "initialPrice": 12400
        }],
        loading: false,
        error: null
    };

    const renderWithRedux = (
        component: JSX.Element,
        store: Store
    ) => {
        return {
            ...render(<Provider store={store}>{component}</Provider>)
        }
    }

    it("shoud retain the currency of the ticket after changing the number of transfers of the ticket", () => {
        let actual = ticketsListReduser(initialState, changeCurrence("usd"));
        const dollarPrice = actual.filteredTickets[0].price;

        actual = ticketsListReduser(actual, transferFilter(3));
        expect(actual.filteredTickets[0].price).toEqual(dollarPrice);
    });

    it("shoud save initial price after rub => $ => eur => rub && correct rounding of currency", () => {
        let actual = ticketsListReduser(initialState, changeCurrence("rub"));
        const rubPrice = actual.tickets[0].price;

        actual = ticketsListReduser(initialState, changeCurrence("usd"));
        expect(actual.tickets[0].price.toString().split(".")[1]).toHaveLength(2);  //проверка округления

        actual = ticketsListReduser(actual, changeCurrence("eur"));
        expect(actual.tickets[0].price.toString().split(".")[1]).toHaveLength(2);

        actual = ticketsListReduser(actual, changeCurrence("rub"));
        expect(actual.tickets[0].price === rubPrice);
    });

    it("tickets shouldn't be lost after several changes of transfers", () => {
        let actual = ticketsListReduser(initialState, transferFilter("all"));

        actual = ticketsListReduser(initialState, transferFilter(1));
        expect(actual.filteredTickets.length).toEqual(0);

        actual = ticketsListReduser(initialState, transferFilter(3));
        expect(actual.filteredTickets.length).toEqual(1);
    });
    it("when the number of transfers changes, tickets shouldn't be lost", async () => {
        const store = configureStore({
            reducer: {
                ticketsList: ticketsListReduser
            },
            preloadedState: { ticketsList: initialState }
        });

        const component = renderWithRedux(<TicketsList />, store);  //"Loading..."
        await component.findByText(/13600/);  //render all tickets

        store.dispatch(transferFilter(0));
        store.dispatch(transferFilter(1));
        store.dispatch(transferFilter(2));
        store.dispatch(transferFilter(3));
        store.dispatch(transferFilter(0));

        expect(component.baseElement).toMatchSnapshot();
    });
});
