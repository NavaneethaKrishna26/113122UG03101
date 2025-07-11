import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Log } from "./log";

export default function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls") || "[]");

    const item = stored.find(
      (u) =>
        u.code === shortCode &&
        new Date(u.expiresAt).getTime() > Date.now()
    );

    if (item) {
      item.clicks += 1;
      localStorage.setItem("urls", JSON.stringify(stored));
      Log(
        "frontend",
        "info",
        "RedirectPage",
        `Redirected short code ${shortCode}`
      );
      window.location.href = item.originalUrl;
    } else {
      Log(
        "frontend",
        "error",
        "RedirectPage",
        `Short code ${shortCode} not found or expired`
      );
      alert("Link expired or does not exist.");
      navigate("/");
    }
  }, [shortCode, navigate]);

  return <div>Redirecting...</div>;
}
