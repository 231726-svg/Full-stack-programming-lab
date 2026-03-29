import React from 'react';
import Counter from '../components/Counter';
import UserForm from '../components/UserForm';
import EventHandling from '../components/EventHandling';

function Home() {
  return (
    <div>
      <Counter />
      <UserForm />
      <EventHandling />
    </div>
  );
}

export default Home;
