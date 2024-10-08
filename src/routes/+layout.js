import { user } from "$lib/stores/user.store";

export function load({ data }) {
  user.set(data.user);
  return data;
}
