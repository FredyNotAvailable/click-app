export async function getClickPrediction({ days_ahead, current_clicks }) {
  console.log("Enviando datos a la IA:", { days_ahead, current_clicks });

  const res = await fetch("https://click-app-ai.onrender.com/predict", {
  // const res = await fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ days_ahead, current_clicks }),
  });

  if (!res.ok) {
    const errorText = await res.text(); // para ver el error exacto
    console.error("Error respuesta IA:", errorText);
    throw new Error("Error al obtener predicción IA: " + errorText);
  }

  const data = await res.json();
  console.log("Respuesta IA:", data);
  return data.predicted_clicks;
}
