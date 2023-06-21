import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { getUser } from '../api';
import Menu from './Menu';

export default function App() {
  const [username, setUsername] = useState('')
  useEffect(() => {
    getUser().then(resp => setUsername(resp))
  }, []);
  return (
    <div className="d-flex flex-column">
      <Menu username={username}/>
      <Outlet/>
    </div>
  );
}
