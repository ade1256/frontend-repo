import React from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../store/userSlice";
import { updateUser } from "../apis/userApi";
import { RootState } from "../store/store";

const UpdateButton = ({ formValue }: { formValue: any }) => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.user
  );

  const handleClick = async () => {
    dispatch(updateUserStart());
    let uid = localStorage.getItem("uid") as string;
    try {
      const data = { uid: uid, data: formValue };
      const result = await updateUser(data);
      dispatch(updateUserSuccess(result.data));
    } catch (err: any) {
      dispatch(updateUserFailure(err.message));
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={loading}
        sx={{ my: 2 }}
        aria-disabled={loading}
      >
        {loading ? "Loading..." : "Update"}
      </Button>
      {error && (
        <Typography color="error" component="p">
          {error}
        </Typography>
      )}
    </>
  );
};

export default UpdateButton;
