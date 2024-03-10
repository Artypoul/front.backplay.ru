import { ADD, NEXT, PLAY, PREV, REMOVE, UPDATE_MUSIC_INDEX } from "../constants/player";

export const AddMusic = (data) => ({
  type: ADD,
  payload: data,
});

export const PlayMusic = (data) => ({
  type: PLAY,
  payload: data,
});

export const RemoveMusic = (data) => ({
  type: REMOVE,
  payload: data,
});

export const NextMusic = (data) => ({
  type: NEXT,
  payload: data,
});

export const PrevMusic = (data) => ({
  type: PREV,
  payload: data,
});

export const UpdateMusicIndex = (data) => ({
  type: UPDATE_MUSIC_INDEX,
  payload: data,
});
