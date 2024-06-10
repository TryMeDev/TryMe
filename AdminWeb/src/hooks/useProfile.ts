import { useEffect } from "react";
import { useGetProfileQuery } from "../slices/adsSlice";
import { useNavigate } from "react-router-dom";
import { ad } from "../slices/adsSlice";

const useProfile: () => {
  profile: ad[] | undefined;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
} = () => {
  const navigate = useNavigate();

  const {
    data: profile,
    isError,
    isLoading,
    isSuccess,
  } = useGetProfileQuery(
    {},
    {
      skip: !localStorage.getItem("token"),
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError]);

  return { profile, isError, isLoading, isSuccess };
};

export default useProfile;
