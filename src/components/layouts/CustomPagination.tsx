import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";
function CustomPagination({ resPerPage, productCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;
  page = Number(page);
  let queryParams;
  const handlePageChange = (currentPageNumber) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }
    if (queryParams.has("page")) {
      queryParams.set("page", currentPageNumber);
    } else {
      queryParams.append("page", currentPageNumber);
    }
    const path = window.location.pathname + "?" + queryParams.toString();
    console.log("path", path);
    router.push(path);
  };
  return (
    <div className="flex mt-20 justify-center">
      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={productCount}
        onChange={handlePageChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        activeLinkClassName="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
        activeClass="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
      />
    </div>
  );
}

export default CustomPagination;
