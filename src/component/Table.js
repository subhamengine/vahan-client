import React from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import getData from "./getData";
import { useState, useMemo, useEffect } from "react";
import icondelete from '../assets/icondelete.svg'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

const Table = ({ data, setData }) => {

  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    getData(setData)
  }, []);


  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [mob, setMob] = useState(null)
  const [dob, setDob] = useState(null)
  const [id, setId] = useState(null)


  const handleEdit = (e) => {
    setEditModal(true);
    setUsername(e.username)
    setEmail(e.email)
    setMob(e.mob)
    setDob(e.dob)
    setId(e.id)



  };
  const handleUpdate = (e) => {

    if (mob && mob.length > 10) alert('Phone number greate 10 digits! ')
    if (username && email && mob && dob) {

      const update = async () => {

        try {

          const savedUserResponse = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/update/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",

              },
              body: JSON.stringify({ username, email, mob, dob })
            }
          );
          const responseData = await savedUserResponse.json();

          console.log(responseData);

          if (responseData.status === 200) {
            toast.success('User Updated!')
            getData(setData)
            setEditModal(false)

          }

          else {

            toast.error("Could not update the user, please try again.");
          }

        } catch (error) {
          toast.error("Could not update the user, please try again.");
        }

      };

      update()
    }
    else {
      toast.error("Enter all the fields");
    }
  };


  const handleDelete = (e) => {
    
      const deleteUser = async () => {

        try {

          const savedUserResponse = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/delete/${e.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",

              },
              
            }
          );
          const responseData = await savedUserResponse.json();

          console.log(responseData);

          if (responseData.status === 200) {
            toast.success("User Deleted");
            getData(setData)

          }

          else {

            toast.error("Could not delete the user, please try again.");
          }

        } catch (error) {
          toast.error("Could not delete the user, please try again.");
        }

      };

      deleteUser()
    
    
  };

  function RenderUser({ data }) {
    const [name, setNameText] = useState("");

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = data.filter((item) =>
      item.username.toLowerCase().includes(name.toLowerCase()) ||
      item.dob.toLowerCase().includes(name.toLowerCase()) ||
      item.mob.toLowerCase().includes(name.toLowerCase()) ||
      item.email.toLowerCase().includes(name.toLowerCase()) 
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
                placeholder="Filter By Name, Email, DOB, Phone number"
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
        name: "User name",
        selector: (d) => d.username,
        sortable: true,
      },

      {
        name: "Email",
        selector: (d) => d.email,
        sortable: true,
      },
      {
        name: "MOB",
        selector: (d) => d.mob,
        sortable: true,
      },
      {
        name: "DOB",
        selector: (d) => d.dob,
        sortable: true,
      },
      {
        name: "Action",
        selector: (d) => {
          return <div className="flex items-center justify-center gap-[10px]">
            <button className="" onClick={() => handleEdit(d)}>edit</button>
            <button onClick={()=>handleDelete(d)} > <img className="w-[20px]" src={icondelete} alt="" /> </button>

          </div>


        },
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

  // const data = [
  //   { id: 1, name: 'John', age: 30 },
  //   { id: 2, name: 'Jane', age: 25 },
  //   { id: 3, name: 'Alice', age: 35 },
  //   // Add more data rows as needed
  // ];

  return (
  <>
  <RenderUser data={data} />
      {editModal && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-[30vw] h-[50vh] bg-white flex flex-col justify-around items-center rounded-lg">
            <div className="w-[100%] h-[10px] text-center text-[18px] relative">Edit
              <button onClick={() => setEditModal(false)} className="text-[20px] absolute right-5">X</button>
            </div>
            <input
              placeholder="Enter username"
              className="border p-[0.5rem] w-[90%]"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
            <input
              placeholder="Enter email"
              className="border p-[0.5rem] w-[90%]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="username"
            />
            <input
              placeholder="Enter phone number"
              className="border p-[0.5rem] w-[90%]"
              value={mob}
              onChange={(e) => setMob(e.target.value)}
              type="number"
              name="username"
            />
            <input
              placeholder="Enter DOB"
              className="border p-[0.5rem] w-[90%]"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              name="username"
            />
            <button
              className="border p-[0.5rem] w-[90%]"
              type="submit"
              onClick={handleUpdate}
            >
              Submit
            </button>
          </div>
        </div>
      )}
  </>
   
  );
};

export default Table;
