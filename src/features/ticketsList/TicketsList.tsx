import React, { useEffect } from 'react';
import { fetchTickets } from '../../API/ticketsListAPI';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from "./TicketsList.module.css";

const TicketsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {error, loading, filteredTickets} = useAppSelector(state => state.ticketsList)

  useEffect(() => {
    dispatch(fetchTickets());
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error</h1>
  }

  return (
    <div className={styles.list}>
      {filteredTickets
        .map((ticket, i): JSX.Element => (
          <div key={i} className={styles.ticket}>
            <div>
              <div className={styles.ticket__sideContent}>
                <div className={styles.ticket__container}>
                  <div className={styles.ticket__buyButton}>
                    <a href="#" className={styles.ticket__buyButton_btn}>Купить {ticket.price}</a>
                  </div>
                  <div className={styles.ticket__carrier}>Компания: {ticket.carrier}</div>
                  <div className={styles.ticket__stop}>Количество пересдок: {ticket.stops}</div>
                </div>
              </div>
              <div className={styles.ticket__content}>
                <div className={styles.ticket__body}>
                  <div className={styles.ticket__origin}>
                    <div className={styles.ticket__time}>Время отправления: {ticket.departure_time}</div>
                    <div className={styles.ticket__name}>{ticket.origin}, {ticket.origin_name}</div>
                    <div className={styles.ticket__date}>{ticket.departure_date}</div>
                  </div>
                  <div className={styles.ticket__destination}>
                    <div className={styles.ticket__time}>Время прибытия: {ticket.arrival_time}</div>
                    <div className={styles.ticket__name}>{ticket.destination}, {ticket.destination_name}</div>
                    <div className={styles.ticket__date}>{ticket.arrival_date}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
      )}
    </div>
  );
};

export default TicketsList;