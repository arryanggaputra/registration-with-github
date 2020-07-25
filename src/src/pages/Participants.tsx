import React, { useState } from "react";
import actions from "../lib/store/actions";
import { connect } from "unistore/react";
import { Participants } from "../types/interface";

interface ParticipantsProps {
  participants: Participants[];
}

const ParticipantsPage: React.SFC<ParticipantsProps> = (props) => {
  const [listUser, setListUser] = useState<Participants[]>(props.participants);

  const onChangeOrder = (e: React.FormEvent<HTMLInputElement>) => {
    let lists = [...listUser];

    if (parseInt(e.currentTarget.value) === 1) {
      lists.sort((a, b) => {
        // @ts-ignore
        return ("" + a.username).localeCompare(b.username);
      });
    } else {
      lists.sort((a, b) => {
        return a.arrival - b.arrival;
      });
    }

    setListUser(lists);
  };

  return (
    <div className="pt-20">
      <h1 className="text-4xl font-bold">Lists of Participants</h1>
      <div className="py-10">
        <label>
          <input type="radio" onChange={onChangeOrder} name="order" value="1" />
          Order By Username
        </label>
        <label>
          <input type="radio" onChange={onChangeOrder} name="order" value="2" />
          Order By Arrival Date
        </label>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">FullName</th>
              <th className="px-4 py-2">Institution</th>
              <th className="px-4 py-2">Arrival</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((item) => {
              let date = new Date(item.arrival);
              return (
                <tr>
                  <td className="border px-4 py-2">{item.username}</td>
                  <td className="border px-4 py-2">{item.full_name}</td>
                  <td className="border px-4 py-2">{item.institution}</td>
                  <td className="border px-4 py-2">
                    {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// @ts-ignore
export default connect("participants", actions)(ParticipantsPage);
