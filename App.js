import React from 'react';
import Greeting from './components/Greeting';

function App() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center' }}>
            <h1>🌤️ Dynamic Greeting App</h1>
            <p>Lab Assignment 5 — React Props</p>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                <Greeting
                    name="Ali Hassan"
                    timeOfDay="Morning"
                    bgColor="#FEF9E7"
                />
                <Greeting
                    name="Sara Khan"
                    timeOfDay="Afternoon"
                    bgColor="#EBF5FB"
                />
                <Greeting
                    name="Usman Raza"
                    timeOfDay="Evening"
                    bgColor="#F4ECF7"
                />
            </div>
        </div>
    );
}

export default App;
