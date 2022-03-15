import create from "zustand";

const useStore = create((set) => ({
  affiliation: "",
  setAffiliation: (affiliation) => set((state) => ({ affiliation })),
  topic: "",
  setTopic: (topic) => set((state) => ({ topic })),
  newsOpinion: "",
  setNewsOpinion: (newsOpinion) => set((state) => ({ newsOpinion })),
  finalOpinion: "",
  setFinalOpinion: (finalOpinion) => set((state) => ({ finalOpinion })),
  reset: () =>
    set((state) => ({
      finalOpinion: "",
      newsOpinion: "",
      topic: "",
      affiliation: "",
    })),
}));

export default useStore;
