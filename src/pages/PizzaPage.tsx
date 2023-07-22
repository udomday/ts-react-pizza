import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PizzaPage: React.FC = () => {
  const [item, setItem] = useState<{
    imageUrl: string;
    title: string;
    price: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://649c2ac904807571923799d3.mockapi.io/pizzas/${id}`
        );
        setItem(data);
      } catch (err) {
        alert("Ошибка получения пиццы");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!item) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div className="container">
      <div>
        <img src={item.imageUrl} />
        <h2>{item.title}</h2>
        <h4>{item.price} ₽</h4>
      </div>
    </div>
  );
};

export default PizzaPage;
