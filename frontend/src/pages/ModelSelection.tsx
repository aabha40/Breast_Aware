import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const ModelSelection = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [uploadedData, setUploadedData] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [modelInfo, setModelInfo] = useState<any>(null);

  const availableModels = [
    { id: "svm", name: "Support Vector Machine", accuracy: "93.1%" },
    { id: "neural-network", name: "Neural Network", accuracy: "94.2%" },
  ];

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    const model = availableModels.find(m => m.id === modelId);
    if (model) {
      setModelInfo(model);
      toast.success(`Selected model: ${model.name}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image file (JPG, PNG)");
            return;
        }
        setUploadedData(file);
        toast.success(`Image uploaded: ${file.name}`);
    }
  };

  const handlePredict = async () => {
    if (!selectedModel) {
        toast.error("Please select a model first");
        return;
    }

    if (!uploadedData) {
        toast.error("Please upload an image first");
        return;
    }

    const formData = new FormData();
    formData.append("file", uploadedData);
    formData.append("model", selectedModel);

    try {
        toast.info("Sending image to model for prediction...");
        const response = await fetch("https://breast-aware-backend-428663962933.asia-south1.run.app/predict", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        setPredictionResult(result);
        toast.success("Prediction complete!");

    } catch (error) {
        toast.error("Prediction failed! Check backend logs.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Model Selection</h1>
            <p className="mt-2 text-lg text-gray-600">
              Choose from different machine learning models for breast cancer prediction
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="col-span-1 shadow-md">
              <CardHeader className="bg-pink-50 border-b">
                <CardTitle className="text-xl text-pink-700">Select Model</CardTitle>
                <CardDescription>Choose a model for prediction</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Select value={selectedModel} onValueChange={handleModelSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map(model => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {modelInfo && (
                  <div className="mt-4 p-4 bg-pink-50 rounded-md">
                    <h3 className="font-semibold mb-2">{modelInfo.name}</h3>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1 shadow-md">
              <CardHeader className="bg-pink-50 border-b">
                <CardTitle className="text-xl text-pink-700">Upload Image</CardTitle>
                <CardDescription>Upload an ultrasound image for prediction</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Upload an ultrasound image for prediction
                  </p>
                  <label className="mt-4 inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-md shadow-sm hover:bg-pink-700 cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*"  
                      className="sr-only" 
                      onChange={handleFileUpload}
                    />
                    Choose Image
                  </label>
                  {uploadedData && (
                    <p className="mt-2 text-sm text-green-600">
                      File uploaded: {uploadedData.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 shadow-md">
              <CardHeader className="bg-pink-50 border-b">
                <CardTitle className="text-xl text-pink-700">Prediction</CardTitle>
                <CardDescription>Run the selected model on your image</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Button 
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  onClick={handlePredict}
                  disabled={!selectedModel || !uploadedData}
                >
                  Run Prediction
                </Button>
                
                {predictionResult && (
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                      <span className="font-semibold">Prediction:</span>
                      <span 
                        className={`font-bold ${
                          predictionResult.prediction === "Malignant" 
                            ? "text-red-600" 
                            : "text-green-600"
                        }`}
                      >
                        {predictionResult.prediction}
                      </span>
                    </div>
                    {/* <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                      <span className="font-semibold">Probability:</span>
                      <span className="font-bold">{predictionResult.probability}</span>
                    </div> */}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
      
      <footer className="bg-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>{new Date().getFullYear()} Breast Cancer Prediction</p>
        </div>
      </footer>
    </div>
  );
};

export default ModelSelection;
