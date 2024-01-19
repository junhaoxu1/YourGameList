import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

interface IPaginationProps {
  page: number;
  total_pages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
}

const Pagination = ({
  page,
  hasPreviousPage,
  hasNextPage,
  onPreviousPage,
  onNextPage,
  onFirstPage,
  onLastPage,
}: IPaginationProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="left">
        <Button
          disabled={!hasPreviousPage}
          onClick={onFirstPage}
          variant="dark"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
        <Button
          disabled={!hasPreviousPage}
          onClick={onPreviousPage}
          variant="dark"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
      </div>

      <div className="page">{page}</div>

      <div className="right">
        <Button disabled={!hasNextPage} onClick={onNextPage} variant="dark">
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
        <Button disabled={!hasNextPage} onClick={onLastPage} variant="dark">
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
