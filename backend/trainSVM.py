import numpy as np
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import classification_report, accuracy_score
from sklearn.preprocessing import StandardScaler
from sklearn.utils.class_weight import compute_class_weight
import joblib

def load_data():
    try:
        features = np.load("features1.npy")
        labels = np.load("labels1.npy")
        return features, labels
    except FileNotFoundError:
        raise Exception("Preprocessed data not found. Run preprocess.py first.")

def train_svm_model():
    # Load data
    X, y = load_data()
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Feature scaling
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    # Compute class weights to handle imbalance
    class_weights = compute_class_weight('balanced', classes=np.unique(y), y=y)
    class_weight_dict = {i: class_weights[i] for i in range(len(class_weights))}

    # Define SVM with hyperparameter tuning
    svm = SVC(probability=True, random_state=42)

    param_grid = {
        'kernel': ['rbf', 'linear'],
        'C': [0.1, 1, 10],
        'gamma': ['scale', 'auto']
    }

    grid_search = GridSearchCV(svm, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
    
    print("Training SVM model with hyperparameter tuning...")
    grid_search.fit(X_train, y_train)

    # Get best model
    best_svm = grid_search.best_estimator_
    
    # Evaluate
    y_pred = best_svm.predict(X_test)
    print("\nBest Parameters:", grid_search.best_params_)
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    
    # Save the best model
    joblib.dump(best_svm, 'breast_cancer_svm_model.pkl')
    print("✅ Best model saved as breast_cancer_svm_model.pkl")

    return best_svm

if __name__ == "__main__":
    model = train_svm_model()
