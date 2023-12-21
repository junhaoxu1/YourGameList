import React from "react";
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
  total_pages,
  hasPreviousPage,
  hasNextPage,
  onPreviousPage,
  onNextPage,
  onFirstPage,
  onLastPage,
}: IPaginationProps) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="left">
        <Button
          disabled={!hasPreviousPage}
          onClick={onFirstPage}
          variant="primary"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
        <Button disabled={!hasPreviousPage} onClick={onPreviousPage}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
      </div>

      <div className="page">
        Page {page}/{total_pages}
      </div>

      <div className="right">
        <Button disabled={!hasNextPage} onClick={onNextPage} variant="primary">
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
        <Button disabled={!hasNextPage} onClick={onLastPage} variant="primary">
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
