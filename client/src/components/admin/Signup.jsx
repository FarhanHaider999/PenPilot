import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const Signup = () => {
  const theme = useTheme();
  const { axios, setToken, navigate } = useAppContext();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/signup", form);
      if (data.success) {
        toast.success("Account created!");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate("/admin"); // redirect after signup
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 3 }}>
        <Typography
          variant="h4"
          fontWeight="700"
          textAlign="center"
          mb={3}
          color={theme.palette.primary.main}
        >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Sign Up
          </Button>

          <Typography textAlign="center" mt={2}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
                fontWeight: 500,
              }}
            >
              Login
            </a>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
