import fetch from "node-fetch";
import https from "https";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuYXZhbmVldGhha3Jpc2huYXIuY3NlMjJAdmVsdGVjaG11bHRpdGVjaC5vcmciLCJleHAiOjE3NTIyMTM4MTAsImlhdCI6MTc1MjIxMjkxMCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU5YzJhYzdlLThkYTItNGM0NS04NTE2LTE1YjFlZGVhZjliOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im5hdmFuZWV0aGEga3Jpc2huYSIsInN1YiI6IjgzM2UyZjM3LWRhZTAtNDE3ZC1hZGY2LTZhNjNiY2VmYjdlMSJ9LCJlbWFpbCI6Im5hdmFuZWV0aGFrcmlzaG5hci5jc2UyMkB2ZWx0ZWNobXVsdGl0ZWNoLm9yZyIsIm5hbWUiOiJuYXZhbmVldGhhIGtyaXNobmEiLCJyb2xsTm8iOiJ2bTE0NjQ0IiwiYWNjZXNzQ29kZSI6IkNXYnFnSyIsImNsaWVudElEIjoiODMzZTJmMzctZGFlMC00MTdkLWFkZjYtNmE2M2JjZWZiN2UxIiwiY2xpZW50U2VjcmV0IjoiY2R5eFREemZaSFBFUmZXVSJ9.-oYDdflE5IMW9fsCDxqVl6Ai7qEqwGAbcog3Knq9fNQ";

async function Log(stack, level, packageName, message) {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString(),
  };

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const response = await fetch(
      "https://20.244.56.144/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        agent,
      }
    );

    if (!response.ok) {
      console.error("Failed to send log:", response.statusText);
    } else {
      console.log("Log sent successfully!");
    }
  } catch (err) {
    console.error("Error sending log:", err);
  }
}
Log("backend", "error", "handler", "received string, expected bool");
