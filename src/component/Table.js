import React from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

import { useState, useMemo } from "react";




const TextField = styled.input`
  height: 36px;
  width: calc(100%-32px);
  flex-grow: 1;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  &:hover {
    cursor: pointer;
  }
`;
const HeaderDiv = styled.div`
  min-width: 300px;
  width: 25%;
  flex-grow: 1;
`;



const Table = () => {
 


  function RenderUser({ data }) {
    const [name, setNameText] = useState("");

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = data.filter(
      (item) =>
        item.name.toLowerCase().includes(name.toLowerCase()) 
    );

    const subHeaderComponentMemo = useMemo(() => {
      return (
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "2rem",
            fontSize: "40px",
            rowGap: 10,
            columnGap: 10,
          }}
        >
          <HeaderDiv>
            <div style={{ display: "flex" }}>
              <TextField
                id="search"
                type="text"
                placeholder="Filter By Name, Email, Designation, Role"
                aria-label="Search Input"
                onChange={(e) => setNameText(e.target.value)}
                style={{ fontSize: "14px" }}
              />
            </div>
          </HeaderDiv>
        </div>
      );
    }, [name, resetPaginationToggle]);
    const customStyles = {
      rows: {
        style: {
          minHeight: "70px", // override the row height
        },
      },
      headCells: {
        style: {
          paddingLeft: "18px", // override the cell padding for head cells
          paddingRight: "8px",
          fontSize: "18px",
        },
      },
      cells: {
        style: {
          paddingLeft: "18px", // override the cell padding for data cells
          paddingRight: "8px",
          cursor: "pointer",
        },
      },
    };


    const columns = [
       
        {
          name: "Name",
          selector: (d) => d.name,
          sortable: true,
        },
      
        {
          name: "Mentorship Phase",
          selector: (d) => d.phase,
          sortable: true,
        },
        {
          name: "Onboarding Stage",
          selector: (d) => d.stage,
          sortable: true,
        },
        {
          name: "Delay in Days",
          selector: (d) => d.delta_in_days,
          sortable: true,
        },
        {
          name: "Program",
          selector: (d) => d.program,
          sortable: true,
        },
      ];



      

    return (
      <>
        <DataTable
          columns={columns}
          data={filteredItems}
          // onRowClicked={(row) => rowClicked(row)}
          highlightOnHover={true}
          customStyles={customStyles}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
        />
        
      </>
    );
  }

  const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Alice', age: 35 },
    // Add more data rows as needed
  ];


  return (
    <div >
      <RenderUser data={data} />
    </div>
  );
};

export default Table;
