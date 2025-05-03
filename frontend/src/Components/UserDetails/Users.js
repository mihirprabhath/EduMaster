import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../User/User";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() { // Renamed "users" to "Users"
  const [users, setUsers] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users)); // Correctly setting the state
  }, []);

  return (
    <div>
      <h1>User   Display Page</h1>
      <div>
        {users &&
          users.map((user, i) => (
            <div key={i}>
              <User User={user} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Users;