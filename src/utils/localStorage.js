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

export const initTask = () => {
  const storageEvents = localStorage.getItem("task");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedTaskReducer = (state, { type, payload }) => {
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

export const initSubTask = () => {
  const storageEvents = localStorage.getItem("subTask");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedSubTaskReducer = (state, { type, payload }) => {
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

export const initResident = () => {
  const storageEvents = localStorage.getItem("resident");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedResidentReducer = (state, { type, payload }) => {
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


export const initShiftList = () => {
  const storageEvents = localStorage.getItem("shiftList");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedShiftListReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initProfileInfo = () => {
  const storageEvents = localStorage.getItem("profileInfo");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedProfileInfoReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((info) => (info.id === payload.id ? payload : info));
    case "delete":
      return state.filter((info) => info.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initScheduleEvent = () => {
  const storageEvents = localStorage.getItem("scheduleEvent");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedScheduleEventReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      if (Array.isArray(payload)) {
        return [...state, ...payload];
      } else {
        return [...state, payload];
      }
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};




export const initFileUpload = () => {
  const storageEvents = localStorage.getItem("fileUploaded");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedFileUploadReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
      // return [...state, ...payload]; // Spread the payload array to push each file individually
    case "update":
      return state.map((info) => (info.id === payload.id ? payload : info));
    case "delete":
      return state.filter((info) => info.id !== payload.id);
    default:
      throw new Error();
  }
};


export const initEduInfo = () => {
  const storageEvents = localStorage.getItem("eduInfo");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedEduInfoReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
      // state[pay]
    case "update":
      return state.map((info) => (info.id === payload.id ? payload : info));
    case "delete":
      return state.filter((info) => info.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initExpInfo = () => {
  const storageEvents = localStorage.getItem("expInfo");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedExpInfoReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((info) => (info.id === payload.id ? payload : info));
    case "delete":
      return state.filter((info) => info.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initFamilyMemberInfo = () => {
  const storageEvents = localStorage.getItem("familyMemberInfo");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedFamilyMemberReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((info) => (info.id === payload.id ? payload : info));
    case "delete":
      return state.filter((info) => info.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initEmergencyContactInfo = () => {
  const storageEvents = localStorage.getItem("emergencyContactInfo");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedEmergencyContectInfoReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((info) => (info.id === payload.id ? payload : info));
    case "delete":
      return state.filter((info) => info.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initSalary = () => {
  const storageEvents = localStorage.getItem("staffSalary");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedSalaryReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((salary) => (salary.id === payload.id ? payload : salary));
    case "delete":
      return state.filter((salary) => salary.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initReview = () => {
  const storageEvents = localStorage.getItem("reviewInfo");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedReviewReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((salary) =>
        salary.id === payload.id ? payload : salary
      );
    case "delete":
      return state.filter((salary) => salary.id !== payload.id);
    default:
      throw new Error();
  }
};

export const initUsers = () => {
  const storageEvents = localStorage.getItem("users");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedUsersReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((users) =>
        users.id === payload.id ? payload : users
      );
    case "delete":
      return state.filter((users) => users.id !== payload.id);
    default:
      throw new Error();
  }
};


export const initPersonalInfo = () => {
  const storageEvents = localStorage.getItem("personalInfo");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

export const savedPersonalInfoReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((info) => (info.id === payload.id ? payload : info));
    case "delete":
      return state.filter((info) => info.id !== payload.id);
    default:
      throw new Error();
  }
};
