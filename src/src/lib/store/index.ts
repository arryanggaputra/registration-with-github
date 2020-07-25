import createStore from "unistore";
import { Participants } from "../../types/interface";

export interface storeProps {
  participants: Participants[];
}

let storeParams: storeProps = {
  participants: [],
};

const store = createStore(storeParams);
export default store;
