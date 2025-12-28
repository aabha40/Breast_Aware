import os
import cv2
import numpy as np
import pandas as pd
from skimage.feature import hog
from skimage import exposure
from sklearn.preprocessing import StandardScaler
import joblib

def preprocess_data(image_path, resize_dim=(128, 128)):
    """Extract HOG features from an image"""
    try:
        # Read and preprocess image
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            raise ValueError(f"Could not read image {image_path}")
        
        # Resize and normalize
        img = cv2.resize(img, resize_dim)
        img = img / 255.0
        
        # Extract HOG features
        features, hog_image = hog(
            img,
            orientations=8,
            pixels_per_cell=(16, 16),
            cells_per_block=(1, 1),
            block_norm='L2-Hys',  # Improves normalization
            visualize=True
        )
        
        return features
    except Exception as e:
        print(f"❌ Error processing {image_path}: {str(e)}")
        return None

def create_dataset(dataset_path="dataset2/"):
    categories = {"benign": 0, "malignant": 1, "normal": 2}
    data = []
    
    for category, label in categories.items():
        category_path = os.path.join(dataset_path, category)
        if not os.path.exists(category_path):
            continue
            
        for img_name in os.listdir(category_path):
            if img_name.lower().endswith((".jpg", ".png", ".jpeg")):
                img_path = os.path.join(category_path, img_name)
                features = preprocess_data(img_path)
                if features is not None:
                    data.append((features, label))

    if not data:
        raise Exception("No valid images found in dataset!")

    # Convert to NumPy arrays
    features, labels = zip(*data)  # Unpack features and labels
    features = np.vstack(features)  # Convert list of arrays to a 2D array
    labels = np.array(labels)

    # Scale features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)

    # Save processed data
    np.save("features1.npy", scaled_features)
    np.save("labels1.npy", labels)
    joblib.dump(scaler, "scaler.pkl")  # Save scaler for consistent transformation

    print(f"✅ Dataset created with {len(labels)} samples")
    print(f"Feature shape: {scaled_features.shape}")
    return scaled_features, labels

if __name__ == "__main__":
    features, labels = create_dataset()
