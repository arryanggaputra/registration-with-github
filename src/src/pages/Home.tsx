import React, { useState, useEffect } from "react";
import getGithubUser from "../lib/GetGithubUser";
import { GithubUser, Participants } from "../types/interface";
import actions from "../lib/store/actions";
import { connect } from "unistore/react";
import { useHistory } from "react-router-dom";

interface HomeProps {
  addParticipants: (...args: any) => void;
  participants: Participants[];
}

const defaultParticipants = [
  { username: "eantz" },
  { username: "gigaprakosa" },
  { username: "ditarahma08" },
  { username: "dedidot" },
  { username: "anomyulian" },
  { username: "heendher" },
  { username: "anggit467" },
  { username: "ghazzan" },
];

const Home: React.SFC<HomeProps> = (props) => {
  const [username, setUsername] = useState("");
  const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
  let history = useHistory();

  const onChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onChangeDate = (e: React.FormEvent<HTMLInputElement>) => {
    if (!githubUser) return;

    let date = new Date(e.currentTarget.value).getTime();

    let user: Participants = {
      username: githubUser.login,
      full_name: githubUser.name,
      institution: githubUser.company,
      arrival: date,
    };

    props.addParticipants(user);
    setTimeout(() => {
      history.push("/participants");
    }, 100);
  };

  const onCLick = async () => {
    try {
      let d = await getGithubUser(username);
      setGithubUser(d);
    } catch (error) {}
  };

  const loadDefaultParticipants = async () => {
    if (props.participants.length > 0) return;
    defaultParticipants.map(async (i) => {
      try {
        let d = await getGithubUser(i.username);

        let user: Participants = {
          username: d.login,
          full_name: d.name,
          institution: d.company,
          arrival: new Date().getTime(),
        };

        props.addParticipants(user);
      } catch (error) {}
    });
  };

  useEffect(() => {
    loadDefaultParticipants();
  }, []);

  return (
    <div className="pt-20">
      <h1 className="text-4xl font-bold">
        Register Using Your Github Username
      </h1>

      <div className="py-10">
        <h1 className="text-2xl">Type your github username</h1>
        <input
          type="text"
          className="p-3 border-2 border-gray-200 "
          onChange={onChangeUsername}
          placeholder="Type your github username"
        />
      </div>

      {githubUser && (
        <div className="py-10">
          <h1 className="text-2xl">Confirm Your Arrival Date</h1>
          <input
            type="date"
            onChange={onChangeDate}
            className="p-3 border-2 border-gray-200 "
            placeholder="Type your github username"
          />
        </div>
      )}
      {!githubUser && (
        <input
          className="p-3 border-2 border-gray-400"
          type="button"
          value="Register"
          onClick={onCLick}
        />
      )}

      {/* {JSON.stringify(props.participants, null, 2)} */}
    </div>
  );
};

// @ts-ignore
export default connect("participants", actions)(Home);
