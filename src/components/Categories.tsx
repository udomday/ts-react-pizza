import { useSelector, useDispatch } from "react-redux";
import { selectCategoryId, setSelectedId } from "../redux/slices/filterSlice";

const Categories: React.FC = () => {
  const arrCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

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
};

export default Categories;
