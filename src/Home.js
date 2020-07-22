import React, { useState, createRef, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { createUltimatePagination } from "react-ultimate-pagination";
import { Link } from "react-router-dom";

import "./styles.css";

function Home() {
  var [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(0);
  const photo = createRef();
  // const [open, setOpen] = useState(false);
  // const [render, setRender] = useState(true);
  const clientId =
    "e8a730dd88a1ca594c2f2c3c10d2d5de2b91ea6e29cc7a64bd6c09b60921086a";

  const getPhotoCurrentPage = async pageCurrent => {
    let res = await axios.get(
      `https://api.unsplash.com/search/photos?page=${pageCurrent}&query=${query}&client_id=${clientId}&per_page=9`
    );

    setPhotos(res.data.results);
  };

  useEffect(() => {
    getPhotoCurrentPage(currentPage);
  }, [currentPage]);

  const Button = ({ value, isActive, disabled, onClick }) => (
    <button
      style={
        isActive
          ? { fontWeight: "bold", background: "#00d2d3", color: "#fff" }
          : null
      }
      onClick={onClick}
      disabled={disabled}
      className="btn btn-default"
      type="button"
    >
      {value}
    </button>
  );

  const PaginatedPage = createUltimatePagination({
    itemTypeToComponent: {
      PAGE: Button,
      ELLIPSIS: () => <Button value="..." />,
      FIRST_PAGE_LINK: () => (
        <Button value="First" onClick={() => setCurrentPage(1)} />
      ),
      PREVIOUS_PAGE_LINK: () => (
        <Button
          value="Prev"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(--currentPage);
            }
          }}
        />
      ),
      NEXT_PAGE_LINK: () => (
        <Button
          value="Next"
          onClick={() => {
            if (currentPage < pages) {
              setCurrentPage(++currentPage);
            }
          }}
        />
      ),
      LAST_PAGE_LINK: () => (
        <Button value="Last" onClick={() => setCurrentPage(pages)} />
      )
    }
  });

  const buttonSearch = async e => {
    let query = photo.current.value;

    let res = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${clientId}`
    );

    setQuery(query);
    setPages(res.data.total_pages);
    setPhotos(res.data.results);

    // console.log(res.data);
  };

  const handleShowDialog = () => {
    setOpen(true);
    setRender(false);
    // console.log("cliked");
  };
  return (
    <div className="App">
      <h1 style={{ color: "white" }}>
        <b>Searchit</b>{" "}
      </h1>

      <h1 style={{ marginTop: "100px", color: "white" }}>
        Free Stock Photos For Everything
      </h1>
      <h4 style={{ color: "white" }}>
        We offer the best free stock photo's all in one place
      </h4>
      <h3>
        Search by Tags :{" "}
        <h3 style={{ color: "yellow" }}>
          Dogs Cats Space Nature Bussiness Office
        </h3>
      </h3>
      <input
        style={{ borderRadius: "20px", padding: "5px", fontSize: "19px" }}
        type="search"
        ref={photo}
        placeholder="Enter Keyword"
      />
      <input
        style={{
          color: "blue",
          border: "solid 4px #34495e",
          backgroundColor: "rgb(184, 215, 224)",
          borderRadius: "20px",
          padding: "10px",
          marginTop: "20px",
          fontWeight: "200"
        }}
        type="button"
        value="Search"
        onClick={buttonSearch}
      />

      <div className="container-photos">
        {photos.map(image => (
          // <a href={e.links.download} key={e.id} target="_blank"></a>
          <div>
            {" "}
            <div>
              <img
                onClick={handleShowDialog}
                src={image.urls.small}
                alt={image.alt_description}
              />
            </div>
            <div
              style={{
                backgroundColor: "#34495e",
                width: "600px",
                marginBottom: "40px",
                marginTop: "0px"
              }}
            >
              <Link
                to={{
                  pathname: `/image`,
                  // src={e.urls.small}
                  state: { image }
                }}
              >
                <div>
                  {" "}
                  <button
                    style={{
                      color: "blue",
                      border: "solid 4px #34495e",
                      backgroundColor: "rgb(184, 215, 224)",
                      borderRadius: "20px",
                      padding: "10px"
                    }}
                  >
                    <b>View Image</b>{" "}
                  </button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <div className="btn-group">
          {pages > 0 ? (
            <PaginatedPage
              totalPages={pages}
              currentPage={currentPage}
              onChange={page => setCurrentPage(page)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
