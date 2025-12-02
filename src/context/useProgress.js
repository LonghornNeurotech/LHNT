import { useContext } from "react";
import { ProgressContext } from "./ProgressContext";

export const useProgress = () => useContext(ProgressContext);