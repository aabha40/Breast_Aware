
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import NavBar from '@/components/NavBar';

const Prediction = () => {
  const [age, setAge] = useState<number>(40);
  const [familyHistory, setFamilyHistory] = useState<boolean>(false);
  const [previousBiopsies, setPreviousBiopsies] = useState<number>(0);
  const [firstMenstrualPeriod, setFirstMenstrualPeriod] = useState<string>("");
  const [firstChildAge, setFirstChildAge] = useState<string>("");
  const [bmi, setBmi] = useState<string>("");
  const [alcoholConsumption, setAlcoholConsumption] = useState<string>("low");
  const [physicalActivity, setPhysicalActivity] = useState<string>("moderate");
  const [result, setResult] = useState<string | null>(null);
  const [riskLevel, setRiskLevel] = useState<string | null>(null);

  const calculateRisk = () => {
    // This is a simplified mock calculation
    // In a real application, you would use a validated risk assessment model
    
    let riskScore = 0;
    
    // Age factor (higher age, higher risk)
    if (age > 50) riskScore += 3;
    else if (age > 40) riskScore += 2;
    else riskScore += 1;
    
    // Family history is a strong factor
    if (familyHistory) riskScore += 3;
    
    // Previous biopsies
    riskScore += previousBiopsies;
    
    // First menstrual period (early menarche increases risk)
    if (firstMenstrualPeriod === "below12") riskScore += 2;
    else if (firstMenstrualPeriod === "12to13") riskScore += 1;
    
    // First child age (having children later or not at all increases risk)
    if (firstChildAge === "none") riskScore += 2;
    else if (firstChildAge === "above30") riskScore += 1;
    
    // BMI factor
    if (bmi === "over30") riskScore += 2;
    else if (bmi === "25to30") riskScore += 1;
    
    // Alcohol consumption
    if (alcoholConsumption === "high") riskScore += 2;
    else if (alcoholConsumption === "moderate") riskScore += 1;
    
    // Physical activity (protective factor)
    if (physicalActivity === "high") riskScore -= 1;
    
    // Determine risk level
    let riskCategory;
    if (riskScore <= 3) {
      riskCategory = "low";
    } else if (riskScore <= 7) {
      riskCategory = "moderate";
    } else {
      riskCategory = "high";
    }
    
    setResult(`Based on the information provided, your risk assessment score is ${riskScore} out of 15.`);
    setRiskLevel(riskCategory);
    
    toast.success("Risk assessment completed");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRisk();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Breast Cancer Risk Assessment</h1>
            <p className="mt-2 text-lg text-gray-600">
              Complete the form below to receive a personalized risk assessment.
            </p>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader className="bg-pink-50 border-b">
              <CardTitle className="text-xl text-pink-700">Risk Assessment Questionnaire</CardTitle>
              <CardDescription>
                This tool provides an estimate of breast cancer risk based on established risk factors.
                It is not a diagnostic tool and should not replace professional medical advice.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-base">Age: {age} years</Label>
                    <Slider 
                      id="age"
                      min={18} 
                      max={85} 
                      step={1}
                      value={[age]}
                      onValueChange={(values) => setAge(values[0])}
                      className="py-4"
                    />
                  </div>

                  <Separator />
                  
                  {/* Family History */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="family-history" className="text-base">
                      Do you have a first-degree relative (mother, sister, or daughter) who has had breast cancer?
                    </Label>
                    <Switch 
                      id="family-history"
                      checked={familyHistory}
                      onCheckedChange={setFamilyHistory}
                    />
                  </div>

                  <Separator />
                  
                  {/* Previous Biopsies */}
                  <div className="space-y-2">
                    <Label htmlFor="biopsies" className="text-base">
                      Number of previous breast biopsies:
                    </Label>
                    <Select 
                      value={previousBiopsies.toString()} 
                      onValueChange={(value) => setPreviousBiopsies(parseInt(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select number of biopsies" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3 or more</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />
                  
                  {/* First Menstrual Period */}
                  <div className="space-y-2">
                    <Label htmlFor="menstrual-period" className="text-base">
                      Age at first menstrual period:
                    </Label>
                    <Select 
                      value={firstMenstrualPeriod} 
                      onValueChange={setFirstMenstrualPeriod}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below12">Below 12 years</SelectItem>
                        <SelectItem value="12to13">12-13 years</SelectItem>
                        <SelectItem value="above13">Above 13 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />
                  
                  {/* First Child Age */}
                  <div className="space-y-2">
                    <Label htmlFor="first-child" className="text-base">
                      Age when first child was born:
                    </Label>
                    <Select 
                      value={firstChildAge} 
                      onValueChange={setFirstChildAge}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below20">Below 20 years</SelectItem>
                        <SelectItem value="20to24">20-24 years</SelectItem>
                        <SelectItem value="25to29">25-29 years</SelectItem>
                        <SelectItem value="above30">30 years or older</SelectItem>
                        <SelectItem value="none">No children</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />
                  
                  {/* BMI */}
                  <div className="space-y-2">
                    <Label htmlFor="bmi" className="text-base">
                      Body Mass Index (BMI):
                    </Label>
                    <Select 
                      value={bmi} 
                      onValueChange={setBmi}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select BMI range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below18.5">Below 18.5 (Underweight)</SelectItem>
                        <SelectItem value="18.5to24.9">18.5-24.9 (Normal weight)</SelectItem>
                        <SelectItem value="25to30">25-30 (Overweight)</SelectItem>
                        <SelectItem value="over30">Over 30 (Obese)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />
                  
                  {/* Alcohol Consumption */}
                  <div className="space-y-2">
                    <Label htmlFor="alcohol" className="text-base">
                      Alcohol consumption:
                    </Label>
                    <Select 
                      value={alcoholConsumption} 
                      onValueChange={setAlcoholConsumption}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (0 drinks per week)</SelectItem>
                        <SelectItem value="low">Low (1-3 drinks per week)</SelectItem>
                        <SelectItem value="moderate">Moderate (4-7 drinks per week)</SelectItem>
                        <SelectItem value="high">High (8+ drinks per week)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />
                  
                  {/* Physical Activity */}
                  <div className="space-y-2">
                    <Label htmlFor="activity" className="text-base">
                      Physical activity level:
                    </Label>
                    <Select 
                      value={physicalActivity} 
                      onValueChange={setPhysicalActivity}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Less than 30 minutes per week)</SelectItem>
                        <SelectItem value="moderate">Moderate (30-150 minutes per week)</SelectItem>
                        <SelectItem value="high">High (More than 150 minutes per week)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-8 bg-pink-600 hover:bg-pink-700">
                  Calculate Risk
                </Button>
              </form>
            </CardContent>
            
            {result && (
              <CardFooter className="flex flex-col space-y-4 bg-gray-50 border-t">
                <div className="text-center w-full py-4">
                  <h3 className="text-xl font-bold mb-2">Your Results</h3>
                  <p className="text-gray-700">{result}</p>
                  
                  {riskLevel && (
                    <div className="mt-4">
                      <p className="font-semibold mb-2">Risk Category:</p>
                      <div className="inline-block px-4 py-2 rounded-full font-semibold text-white 
                        ${riskLevel === 'low' ? 'bg-green-500' : 
                          riskLevel === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'}"
                        style={{
                          backgroundColor: 
                            riskLevel === 'low' ? '#10B981' : 
                            riskLevel === 'moderate' ? '#F59E0B' : '#EF4444'
                        }}
                      >
                        {riskLevel === 'low' ? 'Low Risk' : 
                         riskLevel === 'moderate' ? 'Moderate Risk' : 'High Risk'}
                      </div>
                      
                      <div className="mt-4 text-sm">
                        <p className="text-gray-700 italic">
                          {riskLevel === 'low' 
                            ? 'Continue with routine screening and maintain healthy lifestyle habits.'
                            : riskLevel === 'moderate'
                            ? 'Consider discussing your risk factors with a healthcare provider.'
                            : 'We recommend consulting with a healthcare provider for personalized guidance.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-500 w-full text-center">
                  <p>Remember: This assessment is not a diagnosis. Consult a healthcare professional for proper evaluation.</p>
                </div>
              </CardFooter>
            )}
          </Card>
          
          <div className="mt-8 bg-pink-50 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-pink-700 mb-3">Important Note</h2>
            <p className="text-gray-700">
              This risk assessment tool provides an estimation based on common risk factors. It does not diagnose breast cancer, predict with certainty whether you will develop breast cancer, or replace professional medical advice. 
            </p>
            <p className="text-gray-700 mt-3">
              Regular screening and consultation with healthcare professionals are essential for breast health. If you have concerns about your breast cancer risk, please speak with your doctor.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© {new Date().getFullYear()} BreastAware. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Prediction;
