import React, { useEffect, useRef } from "react";
import qs from "qs";
import Pagination from "../components/Pagination";
import Categories from "../components/Categories";
import Sort, { listSorts } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectFilter, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import NotFoundBlock from "../components/NotFoundBlock";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzas);

  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilter);

  const getPizzas = async () => {
    const http = `https://649c2ac904807571923799d3.mockapi.io/pizzas?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ``
    }&sortBy=${sortType.sort}&order=desc&${
      searchValue ? `search=${searchValue}` : ``
    }`;

    dispatch(
      //@ts-ignore
      fetchPizzas(http)
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortType: sortType.sort,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortType = listSorts.find((obj) => obj.sort === params.sortType);

      dispatch(setFilters({ ...params, sortType }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((pizza: any, index: any) => (
    <PizzaBlock key={index} {...pizza} />
  ));
  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <NotFoundBlock />
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
