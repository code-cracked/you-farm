# Simple Linear Regression

# Importing the libraries
import pandas as pd
import pickle

# Importing the dataset
dataset = pd.read_csv('data.csv')
y = dataset['label']
X = dataset.drop(['label'], axis = 1)

print("Shape of x:", X.shape)
print("Shape of y:", y.shape)

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

print("The Shape of x train:", X_train.shape)
print("The Shape of x test:", X_test.shape)
print("The Shape of y train:", y_train.shape)
print("The Shape of y test:", y_test.shape)

# Fitting Simple Linear Regression to the Training set
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train.values, y_train.values)

# Predicting the Test set results
y_pred = model.predict(X_test.values)

# Saving model using pickle
pickle.dump(model, open('model.pkl','wb'))

# Loading model to compare the results
modelf = pickle.load( open('model.pkl','rb'))
print(modelf.predict([[4, 42, 1000, 123, 800, 7, 2000]]))
