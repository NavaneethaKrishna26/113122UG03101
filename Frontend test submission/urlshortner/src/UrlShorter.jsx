import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
} from "@mui/material";
import { Log } from "./log";

function generateShortCode(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function UrlShorter() {
  const [urlInput, setUrlInput] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls") || "[]");
    setShortenedUrls(
      stored.map((u) => ({
        ...u,
        expiresAt: new Date(u.expiresAt),
      }))
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(shortenedUrls));
  }, [shortenedUrls]);

  const handleShorten = () => {
    setError("");

    if (!urlInput) {
      setError("Please enter a URL.");
      return;
    }

    if (shortenedUrls.length >= 5) {
      setError("You can only shorten 5 URLs concurrently.");
      return;
    }

    let code;
    do {
      code = generateShortCode();
    } while (shortenedUrls.some((item) => item.code === code));

    const expiry = new Date(Date.now() + 30 * 60 * 1000);
    const newItem = {
      originalUrl: urlInput,
      code,
      expiresAt: expiry,
      clicks: 0,
    };

    setShortenedUrls([...shortenedUrls, newItem]);

    Log("frontend", "info", "Shortener", `Shortened new URL: ${urlInput}`);
    setUrlInput("");
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3 }}>
        URL Shortener
      </Typography>

      <TextField
        label="Enter URL"
        fullWidth
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        sx={{ my: 2 }}
      />

      <Button variant="contained" onClick={handleShorten}>
        Shorten URL
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shortenedUrls.map((item) => (
            <TableRow key={item.code}>
              <TableCell>{item.originalUrl}</TableCell>
              <TableCell>
                <a
                  href={`/${item.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {window.location.origin}/{item.code}
                </a>
              </TableCell>
              <TableCell>{item.expiresAt.toLocaleString()}</TableCell>
              <TableCell>{item.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
