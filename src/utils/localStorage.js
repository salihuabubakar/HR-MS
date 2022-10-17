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


export const initDept = () => {
  const storageEvents = localStorage.getItem("dept");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedDeptReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((dept) => (dept.id === payload.id ? payload : dept));
    case "delete":
      return state.filter((dept) => dept.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initDesignation = () => {
  const storageEvents = localStorage.getItem("designation");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedDesignationReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((designation) => (designation.id === payload.id ? payload : designation));
    case "delete":
      return state.filter((designation) => designation.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initHouse = () => {
  const storageEvents = localStorage.getItem("house");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedHouseReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((house) => (house.id === payload.id ? payload : house));
    case "delete":
      return state.filter((house) => house.id !== payload.id);
    default:
      throw new Error();
  }
};
