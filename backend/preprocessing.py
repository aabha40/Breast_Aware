import os
import cv2
import numpy as np
import pandas as pd
from skimage.feature import hog
from skimage import exposure
from sklearn.preprocessing import StandardScaler

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
            visualize=True
        )
        
        # Optional: Enhance HOG image for visualization
        hog_image_rescaled = exposure.rescale_intensity(hog_image, in_range=(0, 10))
        
        return features
    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")
        return None

def create_dataset(dataset_path="dataset/"):
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
                    data.append({
                        "image_path": img_path,
                        "features": features,
                        "label": label
                    })
    
    # Create DataFrame
    df = pd.DataFrame(data)
    
    # Save features and labels
    features = np.stack(df['features'].values)
    labels = df['label'].values
    
    # Scale features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)
    
    # Save processed data
    np.save("features.npy", scaled_features)
    np.save("labels.npy", labels)
    df.to_csv("image_data.csv", index=False)
    
    print(f"✅ Dataset created with {len(df)} samples")
    print(f"Feature shape: {scaled_features.shape}")
    return scaled_features, labels

if __name__ == "__main__":
    features, labels = create_dataset()