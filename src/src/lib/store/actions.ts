import { storeProps } from ".";
import { Participants } from "../../types/interface";

const actions = {
  async addParticipants(state: storeProps, participants: Participants) {
    let d = [...state.participants];

    d.push(participants);
    console.log("d", d);
    return { participants: d };
  },
};

export default actions;
