"use client";
import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "@/store/userSlice";
import { createUserProfile, updateUserLastLogin } from "@/utils/usersUtils";
import { selectUser } from "@/store/selectors";

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(selectUser);

  const handleLogin = async () => {
    dispatch(updateUserStart());
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const token = await auth.currentUser?.getIdToken();

      if (auth.currentUser) {
        await createUserProfile(auth.currentUser);
        await updateUserLastLogin(auth.currentUser?.uid);
      }
      localStorage.setItem("token", token || "");
      localStorage.setItem("uid", auth.currentUser?.uid || "");
      dispatch(updateUserSuccess(auth.currentUser));
      router.push("/");
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
      console.error("Login error", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const token = await auth.currentUser?.getIdToken();

      if (auth.currentUser) {
        await createUserProfile(auth.currentUser);
        await updateUserLastLogin(auth.currentUser?.uid);
      }
      localStorage.setItem("token", token || "");
      localStorage.setItem("uid", auth.currentUser?.uid || "");
      dispatch(updateUserSuccess(auth.currentUser));
      router.push("/");
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
      console.error("Login error", error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Box component="img" src="/static/icons/icon_logo.png" alt="logo" />
        <Typography component="h1" variant="h5">
          Login to your account
        </Typography>
        <Box sx={{ mt: 3, width: "100%" }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
            size="large"
            onClick={signInWithGoogle}
          >
            Google
          </Button>
          <Typography align="center" variant="body2">
            OR
          </Typography>
          <TextField
            label="Email Address"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography component="p" color="error">
              Invalid username or password
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "LOGIN"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
