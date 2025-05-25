import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  // Filter connections based on search term (case-insensitive)
  const filteredConnections = connections.filter(connection => {
    const fullName = `${connection.firstName} ${connection.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="flex">
      {/* Left side - Connections list */}
      <div className="w-3/4 text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>

        {filteredConnections.length === 0 ? (
          <p>No connections match your search</p>
        ) : (
          filteredConnections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
              >
                <div>
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full object-cover"
                    src={photoUrl}
                  />
                </div>
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
                <Link to={"/chat/" + _id}>
                  <button className="btn btn-primary">Chat</button>
                </Link>
              </div>
            );
          })
        )}
      </div>

      {/* Right side - Search bar */}
      <div className="w-1/4 p-4 mt-10">
        <div className="sticky top-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search connections..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Optional: Display search results count */}
          <div className="mt-2 text-sm text-gray-400">
            Showing {filteredConnections.length} of {connections.length} connections
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;