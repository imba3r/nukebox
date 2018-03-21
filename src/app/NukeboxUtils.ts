import {FireStoreTrack, Track} from "@app/types";

export function toFireStoreTrack(spotifyTrack: Track): FireStoreTrack {
  return {
    trackUri: spotifyTrack.uri,
    trackId: spotifyTrack.id
  };
}

export function identity<T>(t: T): T {
  return t;
}
