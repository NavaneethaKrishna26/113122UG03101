
export async function Log(stack, level, packageName, message) {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(
      "https://20.244.56.144/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_TOKEN_HERE`,
        },
        body: JSON.stringify(payload),
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


