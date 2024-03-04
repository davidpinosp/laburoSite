import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PageProps {
  setPageCallback: React.Dispatch<React.SetStateAction<number>>;
  handleNextPage: (currPage: number) => void;
  handlePrevPage: (currPage: number) => void;
  arrayLength: number | undefined;
}

function PageCounter({
  setPageCallback,
  handlePrevPage,
  handleNextPage,
}: PageProps) {
  // const [pageNumber, setPageNumber] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  // const handleLength = (length: number) => {
  //   const pages = length / 25;
  //   setPageNumber(pages);
  // };

  // const getPageMenu = useCallback(
  //   (init: number) => {
  //     let arr: any = [];
  //     const maxPages = Math.min(pageNumber, 3);

  //     for (let i = init; i < init + maxPages; i++) {
  //       arr.push(
  //         <div
  //           key={i}
  //           onClick={() => {
  //             setCurrPage(i);
  //             setPageCallback(i);
  //           }}
  //           className={i === currPage ? "page-active" : ""}
  //         >
  //           {i}
  //         </div>
  //       );

  //       // if more than 3 add ...
  //     }

  //     if (pageNumber > 3) {
  //       arr.push(<div>...</div>);
  //     }
  //     return arr;
  //   },
  //   [currPage, pageNumber, setPageCallback]
  // );

  // useEffect(() => {
  //   console.log("arraylength" + arrayLength);
  //   handleLength(arrayLength || 1);
  //   getPageMenu(1);
  // }, [getPageMenu, arrayLength]);

  return (
    <div
      className="w100 "
      style={{
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center vertically
      }}
    >
      {/* left arrow */}
      <div style={{ marginRight: "10px" }}>
        <ArrowBackIosIcon
          style={{ fontSize: "20px" }}
          onClick={() => {
            setCurrPage(currPage - 1);
            setPageCallback(currPage - 1);
            handlePrevPage(currPage);
          }}
        />
      </div>

      {/* Pages */}
      <div
        className="flx txt-s4 space-even page-active"
        style={{ width: "75px" }}
      >
        {/* {getPageMenu(currPage)} */ currPage}
      </div>

      {/* right arrow */}
      <div style={{ marginLeft: "10px" }}>
        <ArrowForwardIosIcon
          style={{ fontSize: "20px" }}
          onClick={() => {
            setCurrPage(currPage + 1);
            setPageCallback(currPage + 1);
            handleNextPage(currPage);
          }}
        />
      </div>
    </div>
  );
}

export default PageCounter;
