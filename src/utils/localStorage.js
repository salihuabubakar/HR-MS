import { useGlobalState } from "../context/GlobalState";

export const initUserAccount = () => {
  const storageEvents = localStorage.getItem("userAccount");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedUserAccountReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((user) => (user.id === payload.id ? payload : user));
    case "delete":
      return state.filter((user) => user.id !== payload.id);
    default:
      throw new Error();
  }
};
