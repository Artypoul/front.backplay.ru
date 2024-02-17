import { ADD_PROJECT, REMOVE_PROJECT } from "../constants/checkout";

export const AddProject = (data) => ({
  type: ADD_PROJECT,
  payload: data,
});

export const RemoveProject = () => ({
  type: REMOVE_PROJECT,
  payload: null,
});
