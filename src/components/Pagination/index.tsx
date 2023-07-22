import ReactPaginate from "react-paginate";
import styles from "./Pagination.modules.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setSelectedPage } from "../../redux/slices/filterSlice";

const Pagination: React.FC = () => {
  const { currentPage } = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
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

export default Pagination;
