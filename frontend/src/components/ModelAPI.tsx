
import { toast } from "sonner";
import axios from "axios";

// This is a client-side utility to connect to a Python backend API
// It will make actual API calls to a server running your models

interface ModelPredictionParams {
  modelId: string;
  data: any;
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
}


const API_BASE_URL = "https://breast-aware-backend-428663962933.asia-south1.run.app/predict";

export const predictWithModel = async ({
  modelId,
  data,
  onSuccess,
  onError,
}: ModelPredictionParams) => {
  try {
    console.log(`Sending prediction request to model: ${modelId}`);
    console.log("Data:", data);
    
    // Show loading toast
    toast.loading("Processing prediction...");
    
    // Make an actual API call to your Python backend
    const response = await axios.post(`${API_BASE_URL}/predict`, {
      modelId,
      data
    });
    
    // Dismiss the loading toast
    toast.dismiss();
    
    if (response.data && response.data.success) {
      // Call success callback with the prediction result
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      toast.success("Prediction completed successfully");
      return response.data;
    } else {
      throw new Error(response.data?.error || "Unknown error occurred");
    }
  } catch (error) {
    console.error("Error predicting with model:", error);
    
    // Dismiss the loading toast
    toast.dismiss();
    
    // Show error toast
    toast.error("Failed to get prediction from model");
    
    // Call error callback
    if (onError) {
      onError(typeof error === "string" ? error : "Failed to get prediction from model");
    }
    
    throw error;
  }
};

// This function would upload your data to the backend
export const uploadData = async (dataFile: File) => {
  try {
    console.log(`Uploading data file: ${dataFile.name}`);
    
    // Show loading toast
    toast.loading("Uploading data file...");
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", dataFile);
    
    // Make an actual API call to your Python backend
    const response = await axios.post(`${API_BASE_URL}/upload-data`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    
    // Dismiss the loading toast
    toast.dismiss();
    
    if (response.data && response.data.success) {
      toast.success(`Data file ${dataFile.name} uploaded successfully`);
      return response.data;
    } else {
      throw new Error(response.data?.error || "Unknown error occurred");
    }
  } catch (error) {
    console.error("Error uploading data file:", error);
    
    // Dismiss the loading toast
    toast.dismiss();
    
    // Show error toast
    toast.error("Failed to upload data file");
    
    throw error;
  }
};

// Helper function to get model name from ID
const getModelName = (modelId: string): string => {
  const models: Record<string, string> = {
    "neural-network": "Neural Network", // Your neural network model
    "svm": "Support Vector Machine",    // Your SVM model
    "random-forest": "Random Forest Classifier",
    "logistic-regression": "Logistic Regression",
    "decision-tree": "Decision Tree"
  };
  
  return models[modelId] || "Unknown Model";
};

// This function would be used to upload a model to the backend
export const uploadModel = async (modelFile: File, modelName: string) => {
  try {
    console.log(`Uploading model: ${modelName}`);
    
    // Show loading toast
    toast.loading("Uploading model...");
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", modelFile);
    formData.append("modelName", modelName);
    
    // Make an actual API call to your Python backend
    const response = await axios.post(`${API_BASE_URL}/upload-model`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    
    // Dismiss the loading toast
    toast.dismiss();
    
    if (response.data && response.data.success) {
      toast.success(`Model ${modelName} uploaded successfully`);
      return response.data;
    } else {
      throw new Error(response.data?.error || "Unknown error occurred");
    }
  } catch (error) {
    console.error("Error uploading model:", error);
    
    // Dismiss the loading toast
    toast.dismiss();
    
    // Show error toast
    toast.error("Failed to upload model");
    
    throw error;
  }
};
