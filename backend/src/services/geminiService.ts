import { GoogleGenAI, Type, Schema } from "@google/genai";
import dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
// 1. Define the schema matching your TypeScript interface
const tasksResponseSchema = {
  type: Type.ARRAY,
  description:
    "A list of tasks extracted from the user's prompt. Always return an array, even if there is only one task.",
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "The clear title or actionable summary of the task.",
      },
      description: {
        type: Type.STRING,
        description:
          "Any additional context, details, or notes about the task.",
      },
      status: {
        type: Type.STRING,
        enum: ["pending", "in_progress", "completed"],
      },
      priority: {
        type: Type.STRING,
        enum: ["low", "medium", "high"],
      },
      due_date: {
        type: Type.STRING,
        description: "ISO 8601 formatted deadline date string if mentioned.",
      },
    },
    // Only title is absolutely mandatory for a valid task entry
    required: ["title", "description", "priority"],
  },
};

// 2. Initialize the client and call the model
const ai = new GoogleGenAI({});

async function generateTask(prompt: string) {
  try {
    const todayISO = new Date().toISOString().split("T")[0];
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `
      Today's date is strictly ${todayISO}. 
          Use this date as the baseline to calculate any relative deadlines 
          mentioned by the user (e.g., 'in 3 days', 'by Friday', 'tomorrow'). 
          Always output the due_date in YYYY-MM-DD format.
          Extract the task details from this note: 
          ${prompt}`,
      config: {
        // Enforce JSON output matching your schema
        responseMimeType: "application/json",
        responseSchema: tasksResponseSchema,
      },
    });
    const taskData = JSON.parse(response.text as string);
    return Array.isArray(taskData) ? taskData : [];
  } catch (error) {
    // console.log(error);
    return [];
  }
}

export { generateTask };
