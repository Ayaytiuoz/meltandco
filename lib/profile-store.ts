"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Profile = {
  firstName: string;
  lastName: string;
  phone: string;
  cityId: string;
  address: string;
};

const emptyProfile: Profile = {
  firstName: "",
  lastName: "",
  phone: "",
  cityId: "",
  address: "",
};

type ProfileState = {
  profile: Profile;
  save: (profile: Profile) => void;
};

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      save: (profile) => set({ profile }),
    }),
    { name: "melt-profile", skipHydration: true },
  ),
);
