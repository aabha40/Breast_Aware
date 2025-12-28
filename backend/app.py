from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import joblib
from skimage.feature import hog
import tensorflow as tf

# Initialize Flask
app = Flask(__name__)
CORS(app, origins=["*"], methods=["GET", "POST", "OPTIONS"], allow_headers=["Content-Type", "Authorization"])

# Handle preflight OPTIONS requests
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

# Define folders
UPLOAD_FOLDER = 'uploads'
MODELS_FOLDER = './models'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(MODELS_FOLDER, exist_ok=True)

# Initialize model variables
neural_network_model = None
svm_model = None

# Define class labels
CLASS_LABELS = ["Benign", "Malignant", "Normal"]

def load_neural_network():
    global neural_network_model
    if neural_network_model is None:
        try:
            neural_network_model = tf.keras.models.load_model(os.path.join(MODELS_FOLDER, 'densenet121_model.h5'))
            print("Neural network model loaded successfully")
        except Exception as e:
            print(f"Error loading neural network: {e}")
    return neural_network_model

def load_svm():
    global svm_model
    if svm_model is None:
        try:
            svm_model = joblib.load(os.path.join(MODELS_FOLDER, 'breast_cancer_svm_model1.pkl'))
            print("SVM model loaded successfully")
        except Exception as e:
            print(f"Error loading SVM: {e}")
    return svm_model

def preprocess_for_densenet(image_path):
    """Preprocess image for DenseNet121 model."""
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))  # Resize for DenseNet
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

def preprocess_for_svm(image_path):
    """Preprocess image for SVM model (grayscale + HOG features)."""
    img = Image.open(image_path).convert('L')  # Convert to grayscale
    img = img.resize((128, 128))  # Resize to match training size
    img_array = np.array(img)

    # Extract HOG features
    features, _ = hog(
        img_array,
        orientations=8,
        pixels_per_cell=(16, 16),
        cells_per_block=(1, 1),
        visualize=True
    )
    return features.reshape(1, -1)  # Reshape for prediction

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'API is running',
        'neural_network_loaded': neural_network_model is not None,
        'svm_loaded': svm_model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("Received request!")  # Debug log

        if 'file' not in request.files or 'model' not in request.form:
            return jsonify({'success': False, 'error': 'Missing file or model selection'})

        file = request.files['file']
        model_id = request.form['model']
        
        print(f"Model Selected: {model_id}")  # Debug log

        if file.filename == '':
            return jsonify({'success': False, 'error': 'No selected file'})

        image_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(image_path)
        print(f"File saved at: {image_path}")

        # Load and predict with the requested model
        if model_id in ['DenseNet121', 'neural-network']:
            model = load_neural_network()
            if model is None:
                return jsonify({'success': False, 'error': 'Neural network model not available'})
                
            preprocessed_data = preprocess_for_densenet(image_path)
            print(f"Preprocessed Data Shape: {preprocessed_data.shape}")

            prediction = model.predict(preprocessed_data)[0]
            print(f"Raw Prediction: {prediction}")

            predicted_class = np.argmax(prediction)
            confidence = float(np.max(prediction)) * 100
            probabilities = {CLASS_LABELS[i]: float(prob) * 100 for i, prob in enumerate(prediction)}

        elif model_id in ['svm', 'SVM']:
            model = load_svm()
            if model is None:
                return jsonify({'success': False, 'error': 'SVM model not available'})
                
            preprocessed_data = preprocess_for_svm(image_path)
            print(f"SVM Features Shape: {preprocessed_data.shape}")

            prediction = model.predict(preprocessed_data)[0]
            print(f"SVM Prediction: {prediction}")

            if hasattr(model, "predict_proba"):
                proba = model.predict_proba(preprocessed_data)[0]
                probabilities = {CLASS_LABELS[i]: float(proba[i]) * 100 for i in range(len(proba))}
                predicted_class = np.argmax(proba)
            else:
                probabilities = {CLASS_LABELS[prediction]: 100}
                predicted_class = prediction

            confidence = float(max(probabilities.values())) if probabilities else None

        else:
            return jsonify({'success': False, 'error': 'Unknown model ID'})

        predicted_label = CLASS_LABELS[predicted_class]

        response = {
            'success': True,
            'prediction': predicted_label,
            'confidence': confidence,
            'probabilities': probabilities,
            'modelName': model_id
        }
        print("Flask Response:", response)
        return jsonify(response)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
