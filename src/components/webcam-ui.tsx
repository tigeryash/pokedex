"use client";

import Webcam from "react-webcam";
import { useRef, useCallback, useEffect } from "react";
import webcamStore from "@/stores/webcamstore";
import { CameraIcon, Cross1Icon } from "@radix-ui/react-icons";
import { resizeFile } from "@/lib/utils";

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

const WebcamUi = () => {
  const setShowWebCam = webcamStore((state) => state.setShowWebCam);
  const showWebCam = webcamStore((state) => state.showWebCam);
  const setCamImage = webcamStore((state) => state.setCamImage);
  const webcamRef = useRef<Webcam>(null);
  const camRef = useRef<HTMLDivElement>(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const resized = await resizeFile(blob);
      setCamImage(resized);
      setShowWebCam(false);
    }
  }, [webcamRef, setCamImage, setShowWebCam]);

  useEffect(() => {
    if (showWebCam) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    let handler = (e: MouseEvent) => {
      if (!camRef.current?.contains(e.target as Node)) {
        setShowWebCam(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("mousedown", handler);
      document.body.classList.remove("no-scroll");
    };
  }, [camRef, setShowWebCam, showWebCam]);

  return (
    <div className=" fixed top-0 h-screen w-full flex flex-col justify-center items-center bg-black/80 p-2">
      <button
        className="absolute top-4 right-4"
        onClick={() => setShowWebCam(false)}
      >
        <Cross1Icon className="w-8 h-8" />
      </button>
      <div className="" ref={camRef}>
        <Webcam
          audio={false}
          height={1280}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={720}
          videoConstraints={videoConstraints}
          className="rounded-t-lg "
        />
        <div className="flex justify-center rounded-b-lg items-center bg-[#240E62] py-2">
          <button
            onClick={capture}
            className="bg-white p-2 rounded-full border-black border-2  hover:scale-[1.10] active:scale-95 transition-all duration-100"
          >
            <CameraIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamUi;
