"use client";

import { ErrorsProps } from "@/types/ErrorsProps";
import { useState } from "react";

export const useSetFieldErrors = () => {
  const [errorsData, setErrorsData] = useState<ErrorsProps[]>([]);

  const setFieldErrors = (errors: ErrorsProps[]) => {
    setErrorsData(errors);
  };

  return { setFieldErrors, errorsData };
};