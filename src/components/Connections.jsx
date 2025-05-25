import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [skillSearchTerm, setSkillSearchTerm] = useState("");
  
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

  // Filter connections based on both name and skills search terms
const filteredConnections = connections.filter(connection => {
  const nameMatch = `${connection.firstName} ${connection.lastName}`
    .toLowerCase()
    .includes(nameSearchTerm.toLowerCase());

  const skillMatch =
    skillSearchTerm === "" ||
    (connection.skills &&
      connection.skills.some(skill =>
        skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
      )
    );

  return nameMatch && skillMatch;
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
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
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
                <div className="text-left mx-4 flex-1">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p className="my-2">{about}</p>
                  
                  {/* Skills display */}
                  {skills && skills.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="badge badge-outline rounded-full py-2 px-4"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link to={"/chat/" + _id}>
                  <button className="btn btn-primary">Chat</button>
                </Link>
              </div>
            );
          })
        )}
      </div>

      {/* Right side - Search bars */}
      <div className="w-1/4 p-4 mt-10">
        <div className="sticky top-4 space-y-4">
          {/* Name Search */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Search by name</span>
            </label>
            <input
              type="text"
              placeholder="Search connections..."
              className="input input-bordered w-full"
              value={nameSearchTerm}
              onChange={(e) => setNameSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Skills Search */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Search by skills</span>
            </label>
            <input
              type="text"
              placeholder="Search by skills..."
              className="input input-bordered w-full"
              value={skillSearchTerm}
              onChange={(e) => setSkillSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Search results count */}
          <div className="mt-2 text-sm text-gray-400">
            Showing {filteredConnections.length} of {connections.length} connections
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;