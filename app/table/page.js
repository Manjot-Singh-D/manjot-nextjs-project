"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [tableData, setTableData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  // const [router, setRouter] = useState(() => useRouter());
  const router = useMemo(() => useRouter());
  const [sortingConst, setSortingConst] = useState({
    first_name: 0,
    last_name: 0,
    gender: 0,
    email: 0,
  });
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    axios
      .get("https://frontendtestapi.staging.fastjobs.io/auth/me", {
        withCredentials: true,
      })
      .then(() => {
        axios
          .get("https://frontendtestapi.staging.fastjobs.io/data", {
            withCredentials: true,
          })
          .then((data) => {
            setTableData(data.data);
            setShowData(data.data);
          })
          .catch((err) => {
            console.log(err);
            router.push("/login");
          });
      })
      .catch((err) => {
        console.log(err);
        router.push("/login");
      });
  }, []);

  const sortFields = (field) => {
    setSortingConst((sortingConst) => {
      let newSortingConst = { ...sortingConst };
      newSortingConst[field] = newSortingConst[field] + 1;

      return newSortingConst;
    });
    setShowData((showData) => {
      let newData = [...showData];
      newData.sort((td1, td2) => {
        if (sortingConst[field] % 3 === 2) {
          return td1["id"] < td2["id"] ? -1 : td1["id"] === td2["id"] ? 0 : 1;
        } else if (sortingConst[field] % 3 === 0) {
          return td1[field] < td2[field]
            ? -1
            : td1[field] === td2[field]
            ? 0
            : 1;
        } else {
          return td1[field] < td2[field]
            ? 1
            : td1[field] === td2[field]
            ? 0
            : -1;
        }
      });
      return newData;
    });
  };
  const renderSign = (field) => {
    // let value = sortingConst[field];
    // let temp = sortingConst[field] % 3;

    return sortingConst[field] % 3 === 1 ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    ) : sortingConst[field] % 3 === 2 ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    ) : (
      <div></div>
    );
  };

  const changeSearchValue = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchVal(value);
    setPageNumber(0);
    if (value.length < searchVal.length) {
      setShowData(tableData);
    }
    setShowData((showData) => {
      let newData = [...showData];
      newData = newData.filter((data) => {
        return (
          data["first_name"].toLowerCase().includes(value.toLowerCase()) ||
          data["last_name"].toLowerCase().includes(value.toLowerCase())
        );
      });
      return newData;
    });
  };
  return (
    <div className="tablePage">
      <div className="tableHeading">
        <p>Graphic Designer</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 ml-1"
          // style={{}}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
          />
        </svg>
      </div>
      <div className="tableWrapper">
        <div className="tableTop">
          <div className="inputWrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{ padding: "0.25rem", color: "#00000080" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              type="text"
              name="search"
              placeholder="Type to search..."
              value={searchVal}
              onChange={changeSearchValue}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={() => sortFields("first_name")}>
                <div className="header">
                  <p>First Name</p> <div>{renderSign("first_name")}</div>
                </div>
              </th>
              <th onClick={() => sortFields("last_name")}>
                <div className="header">
                  <p>Last Name</p> <div>{renderSign("last_name")}</div>
                </div>
              </th>
              <th onClick={() => sortFields("gender")}>
                <div className="header">
                  <p>Gender</p> <div>{renderSign("gender")}</div>
                </div>
              </th>
              <th onClick={() => sortFields("email")}>
                <div className="header">
                  <p>Email</p> <div>{renderSign("email")}</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {showData.length > 0 ? (
              showData
                .slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
                .map((data, idx) => {
                  return (
                    <tr
                      key={data.id}
                      className={`${idx % 2 === 1 ? "evenColor" : ""}`}
                    >
                      <td style={{ fontWeight: "500" }}>{data.first_name}</td>
                      <td style={{ fontWeight: "500" }}>{data.last_name}</td>
                      <td>{data.gender}</td>
                      <td>{data.email}</td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td>No result</td>
                <td>No result</td>
                <td>No result</td>
                <td>No result</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="bottomController">
          <button
            onClick={() =>
              pageNumber > 0
                ? setPageNumber((pageNumber) => pageNumber - 1)
                : undefined
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{
                border: "1px solid #000000",
                borderRadius: "50%",
                padding: "2px",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <span>
            Page {pageNumber + 1}/
            {Math.max(1, Math.ceil(showData.length / pageSize))}
          </span>
          <button
            onClick={() =>
              pageNumber < Math.ceil(showData.length / pageSize) - 1
                ? setPageNumber((pageNumber) => pageNumber + 1)
                : undefined
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{
                border: "1px solid #000000",
                borderRadius: "50%",
                padding: "2px",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
