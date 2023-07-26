import React, { useEffect, useRef } from "react";
import qs from "qs";
import { listSorts } from "../components/Sort";

import {
  Pagination,
  Categories,
  Sort,
  PizzaBlock,
  NotFoundBlock,
} from "../components";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../redux/slices/filter/slice";
import { selectFilter } from "../redux/slices/filter/selectors";
import {
  FilterSliceState,
  SortPropertyEnum,
} from "../redux/slices/filter/types";
import { fetchPizzas } from "../redux/slices/pizzas/slice";
import { selectPizzas } from "../redux/slices/pizzas/selectors";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzas);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const getPizzas = async () => {
    const http = `https://649c2ac904807571923799d3.mockapi.io/pizzas?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ``
    }&sortBy=${sort.sortType}&order=desc&${
      searchValue ? `search=${searchValue}` : ``
    }`;

    dispatch(fetchPizzas(http));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortType: sort.sortType,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FilterSliceState;

      const sort = listSorts.find((obj) => obj.sortType === params.sortType);

      if (sort) {
        params.sort = sort;
      } else {
        params.sort = {
          title: "популярности",
          sortType: SortPropertyEnum.RATING,
        };
      }

      if (!params.currentPage) {
        params.currentPage = 1;
      }

      if (!params.categoryId) {
        params.categoryId = 0;
      }

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

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
