
import './App.css';
import Table from './component/Table';
import getData from './component/getData';
import { useState } from 'react';

function App() {



  const [username,setUsername]=useState(null)
  const [email,setEmail]=useState(null)
  const [mob,setMob]=useState(null)
  const [dob,setDob]=useState(null)
  const [data, setData] = useState([]);

  const submit = ()=>{

    if(mob && mob.length > 10) alert('Phone number greate 10 digits! ')
    if(username && email && mob && dob ){

      

      const Create = async () => {
      
        try {
         
            const savedUserResponse = await fetch(
              `${process.env.REACT_APP_API_BASE_URL}/create`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  
                },
                body:JSON.stringify({username,email,mob,dob})
              }
            );
            const responseData = await savedUserResponse.json();
  
            console.log(responseData);
    
            if (responseData.status === 200) {
              alert('User created!')
              getData(setData)
            }
            
            else{
             
              console.log(responseData.message);
            }
          
        } catch (error) {
          console.log("Internal Server Error");
        }
       
      };

      Create()
      

    }
    else{
    alert("Enter all the fields.")
    }
  }






  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-[10px]' >
      <div className='w-[70vw] h-[5vh] flex justify-between' >

        <input className='border p-[0.5rem]' placeholder='Enter username' style={{height:"100%"}} type="text" value={username} name='username' onChange={(e)=>setUsername(e.target.value)}/>
        <input className='border p-[0.5rem]' placeholder='Enter email' style={{height:"100%"}} type="email" value={email} name='username' onChange={(e)=>setEmail(e.target.value)}/>
        <input className='border p-[0.5rem]' placeholder='Enter phone number' style={{height:"100%"}} type="number" value={mob} name='username' onChange={(e)=>setMob(e.target.value)}/>
        <input className='border p-[0.5rem]' placeholder='Enter DOB' style={{height:"100%"}} type="date" value={dob} name='username' onChange={(e)=>setDob(e.target.value)}/>
        <button className='border p-[0.5rem] px-[1rem]' type='submit' onClick={submit}>Submit</button>
      </div>
      <div className='w-[70vw] h-[60vh] border overflow-y-scroll' >
        <Table data={data} setData={setData}/>
      </div>

      


    </div>
  );
}

export default App;
