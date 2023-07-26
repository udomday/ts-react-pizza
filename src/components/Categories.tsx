import { useSelector, useDispatch } from "react-redux";
import { setSelectedId } from "../redux/slices/filter/slice";
import { selectCategoryId } from "../redux/slices/filter/selectors";
import { memo } from "react";

const arrCategories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC = memo(() => {
  const value = useSelector(selectCategoryId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {arrCategories.map((categoryName, index) => (
          <li
            onClick={() => dispatch(setSelectedId(index))}
            className={value === index ? "active" : ""}
            key={index}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
