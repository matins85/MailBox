import { atom, useAtom } from "jotai";

import { Message } from "@/utils/interface";

type Config = {
  selected: Message["_id"] | null;
};

const configAtom = atom<Config>({
  selected: null,
});

export function useMail() {
  return useAtom(configAtom);
}
