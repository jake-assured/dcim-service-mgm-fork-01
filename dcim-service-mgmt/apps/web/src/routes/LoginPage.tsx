import React, { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { api, setAuthToken, type LoginResponse } from "../lib/api";
import { setToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@dcm.local");
  const [password, setPassword] = useState("Admin123!");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await api.post<LoginResponse>("/auth/login", { email, password });
      setToken(res.data.accessToken);
      setAuthToken(res.data.accessToken);
      nav("/", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Card sx={{ width: 420 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2 }}>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error ? <Typography color="error">{error}</Typography> : null}
            <Button type="submit" variant="contained" disabled={busy}>
              {busy ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
          <Typography variant="caption" sx={{ display: "block", mt: 2, opacity: 0.8 }}>
            MVP uses email/password. SSO (OIDC) can be enabled in Phase 2.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
