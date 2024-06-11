"use client";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { fetchUser } from "../apis/userApi";
import UpdateButton from "../components/UpdateButton";
import { selectUser } from "@/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { updateUserStart, updateUserSuccess } from "@/store/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

const MainPage: NextPage = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    displayName: "",
  });

  const onChangeForm = (name: string, value: any) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  useEffect(() => {
    const initDataUser = async () => {
      dispatch(updateUserStart());
      let uid = localStorage.getItem("uid") as string;
      const response = await fetchUser(uid);
      dispatch(updateUserSuccess(response));
      setFormValue(response);
    };
    initDataUser();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    router.push("/login");
  };

  if (!user.data) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          mt: 8,
        }}
      >
        <Typography color="error" component="p">
          Unauthorized
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        mt: 8,
      }}
    >
      <Typography component="h3" variant="h5">
        Welcome, {user.data.email}!
      </Typography>
      <Typography component="p">uid: {user.data.uid}</Typography>
      <TextField
        label="Display Name"
        fullWidth
        variant="outlined"
        margin="normal"
        value={formValue["displayName"]}
        onChange={(e) => onChangeForm("displayName", e.target.value)}
      />
      <UpdateButton formValue={formValue} />
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={handleLogout}
      >
        LOGOUT
      </Button>
    </Box>
  );
};

export default MainPage;
