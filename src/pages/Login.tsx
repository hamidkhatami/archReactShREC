import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Alert,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { t } from "i18next";
import { useLogin } from '@/hooks/useLogin';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setLogedIn] = useState<boolean>(false);

  const [errorCode, setErrorCode] = useState<string>();
  const [alert, setAlert] = useState<
    { severity: "success" | "error" } | null
  >(null);
  const [valid, setValid] = useState<Boolean>(true);
  const mutation = useLogin();


  if (isLoggedIn) {
    return <Navigate to="/dashboard" />
  }

  const renderAlert = () => {
    if (!alert) return null;

    debugger
    return (

      <Alert severity="error" sx={{ mt: 2 }}>
        {t(`validations.${errorCode}`)}
      </Alert>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!valid) {
      setValid(false)
      return
    }
    setLoading(true);
    mutation.mutate(
      { userName: username, password: password },
      {
        onSuccess: (s) => {
          debugger
          setLogedIn(true);
          // setAlert({ severity: "success" });
        },
        onError: (error) => {
          setLogedIn(false);
          setLoading(false);
          setAlert({ severity: "error" });
          setErrorCode(error?.response?.data.SERVER_ERROR)
        },
      }
    );
    if (!valid) return;
  };
  const handleBlur = (): void => {
    debugger
    let valid: boolean = true;
    valid = username.trim() !== "" && password.trim() !== "" && password.length >= 4;
    setValid(valid);

  }

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: 360,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="login"
          >
            {t("labels.loginTitle")}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t("labels.userName")}
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              error={false}
              onBlur={() => handleBlur()}

            />
            <Tooltip title={t("messages.inValidUsername")} arrow >
            <TextField
              fullWidth
              label={t("labels.password")}
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            
              
            />
            </Tooltip>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              //disabled={!valid || loading}
              sx={{
                mt: 3,
                borderRadius: 2,
                height: 48,
                fontWeight: "bold",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("labels.enter")
              )}
            </Button>
          </Box>
          {renderAlert()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;