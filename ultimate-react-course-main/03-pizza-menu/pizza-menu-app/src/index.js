import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];



function Title() {
  return (
    <div className='header'>
      <h1>Fast react pizza</h1>
    </div>
  );
}

function Menu() {
  return (
    <div className='menu'>
      <h2>Our menu</h2>
      <p>Authentic Italian Cuisine. 6 creative dishes to choose from.
        All from our stone oven, all organic, all delicious.
      </p>
    </div>
  )
}

function Pizzas() {
  return (
    <div className='pizzas'>
      { pizzaData.map((pizza, index) => (
        <Pizza
          key={index}
          name={pizza.name}
          ingredients={pizza.ingredients}
          price={pizza.price}
          photoName={pizza.photoName}
          soldOut={pizza.soldOut}
        />
      ))}
    </div>
  )
}

function Pizza(props) {
  return (
    <div className={`pizza ${props.soldOut ? "sold-out" : ""}`}>
      <img src={props.photoName} alt={props.name} />
      <div>
        <h3>{props.name}</h3>
        <p>{props.ingredients}</p>
        <span>{props.soldOut ? "SOLD OUT" : props.price}</span>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className='order'>
      <p className='footer'>We're open from 12:00 to 22:00. Come to visit us or order online.</p>
      <div className='btn'>
        ORDER
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='container'>
      <Title />
      <Menu />
      <Pizzas />
      <Footer />
    </div>
  </React.StrictMode>
);
