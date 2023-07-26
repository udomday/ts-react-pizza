import ReactPaginate from "react-paginate";
import styles from "./Pagination.modules.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPage } from "../../redux/slices/filter/slice";
import { selectFilter } from "../../redux/slices/filter/selectors";

export const Pagination: React.FC = () => {
  const { currentPage } = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setSelectedPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};
