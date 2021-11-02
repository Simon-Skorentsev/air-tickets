import React from 'react';
import styles from './App.module.css';
import Filter from './features/filter/Filter';
import TicketsList from './features/ticketsList/TicketsList';

function App() {
  return (
    <div className={styles.App}>
      <Filter/>
      <TicketsList/>
    </div>
  );
}

export default App;
