
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';

const Index = () => {
  const preventionMethods = [
    {
      title: "Maintain a Healthy Weight",
      description: "Being overweight or obese increases the risk of breast cancer, especially after menopause.",
      icon: "🥗"
    },
    {
      title: "Stay Physically Active",
      description: "Regular physical activity can help maintain a healthy weight and may lower breast cancer risk.",
      icon: "🏃‍♀️"
    },
    {
      title: "Limit Alcohol Consumption",
      description: "The more alcohol you drink, the greater your risk of developing breast cancer.",
      icon: "🚫"
    },
    {
      title: "Breastfeed If Possible",
      description: "Women who breastfeed have a lower risk of breast cancer than women who have never breastfed.",
      icon: "👶"
    },
    {
      title: "Regular Screenings",
      description: "Regular mammograms can help detect breast cancer early, when it's most treatable.",
      icon: "🔍"
    },
    {
      title: "Know Your Family History",
      description: "If you have a family history of breast cancer, talk to your doctor about genetic testing.",
      icon: "👪"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="hero-pattern py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight">
            Welcome to <span className="text-pink-600">BreastAware</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering you with knowledge and tools for breast cancer awareness and early detection.
          </p>
          <div className="mt-10">
            <Link to="/prediction">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-md shadow-md">
                Get Your Risk Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* What is Breast Cancer Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What is Breast Cancer?</h2>
            <div className="mt-2 w-16 h-1 bg-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                Breast cancer is a disease in which cells in the breast grow out of control. There are different kinds of breast cancer. The kind of breast cancer depends on which cells in the breast turn into cancer.
              </p>
              <p className="text-lg text-gray-700">
                Breast cancer can begin in different parts of the breast. A breast is made up of three main parts: lobules, ducts, and connective tissue. The lobules are the glands that produce milk. The ducts are tubes that carry milk to the nipple. The connective tissue (which consists of fibrous and fatty tissue) surrounds and holds everything together.
              </p>
              <p className="text-lg text-gray-700">
                Most breast cancers begin in the ducts or lobules. Breast cancer can spread outside the breast through blood vessels and lymph vessels. When breast cancer spreads to other parts of the body, it is said to have metastasized.
              </p>
            </div>
            <div className="bg-pink-100 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Facts About Breast Cancer</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">•</span>
                  <span className="text-gray-700">Breast cancer is the most common cancer among women worldwide.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">•</span>
                  <span className="text-gray-700">Early detection significantly increases survival rates.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">•</span>
                  <span className="text-gray-700">Men can also develop breast cancer, although it's rare.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">•</span>
                  <span className="text-gray-700">The main symptoms include lumps, skin changes, nipple discharge, and swelling.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-pink-600 mr-2">•</span>
                  <span className="text-gray-700">Risk factors include age, genetic mutations, family history, and lifestyle factors.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Prevention Methods Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Prevention Methods</h2>
            <div className="mt-2 w-16 h-1 bg-pink-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              While there's no sure way to prevent breast cancer, these lifestyle changes can help reduce your risk.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preventionMethods.map((method, index) => (
              <Card key={index} className="preventionCard border-t-4 border-pink-400">
                <CardHeader className="pb-2">
                  <div className="text-4xl mb-2">{method.icon}</div>
                  <CardTitle className="text-xl font-bold">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-base">
                    {method.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-pink-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Take Control of Your Health Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Use our prediction tool to assess your risk factors and take proactive steps toward breast health.
          </p>
          <Link to="/prediction">
            <Button className="bg-white text-pink-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-md shadow-md">
              Get Your Assessment
            </Button>
          </Link>
        </div>
      </div>

{/* 
      <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BreastAware</h3>
            <p className="text-gray-300">
              Empowering through education and early detection.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/prediction" className="text-gray-300 hover:text-white">Prediction</Link></li>
            </ul>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Index;
