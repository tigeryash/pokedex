import { create } from "zustand";

type WebCamStore = {
  showWebCam: boolean;
  setShowWebCam: (show: boolean) => void;
  camImage: string | null;
  setCamImage: (image: string | null) => void;
};

const webcamStore = create<WebCamStore>((set) => ({
  showWebCam: false,
  setShowWebCam: (show: boolean) => set({ showWebCam: show }),
  camImage: null,
  setCamImage: (image: string | null) => set({ camImage: image }),
}));

export default webcamStore;
