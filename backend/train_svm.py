import numpy as np
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from sklearn.preprocessing import StandardScaler
import joblib

def load_data():
    try:
        features = np.load("features.npy")
        labels = np.load("labels.npy")
        return features, labels
    except FileNotFoundError:
        raise Exception("Preprocessed data not found. Run preprocess.py first")

def train_svm_model():
    # Load data
    X, y = load_data()
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Train SVM
    svm = SVC(
        kernel='rbf',  # You can try 'linear', 'poly', 'sigmoid' too
        C=1.0,         # Regularization parameter
        gamma='scale', # Kernel coefficient
        probability=True,
        random_state=42
    )
    
    print("Training SVM model...")
    svm.fit(X_train, y_train)
    
    # Evaluate
    y_pred = svm.predict(X_test)
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    
    # Save model
    joblib.dump(svm, 'breast_cancer_svm_model.pkl')
    print("✅ Model saved as breast_cancer_svm_model.pkl")
    
    return svm

if __name__ == "__main__":
    model = train_svm_model()