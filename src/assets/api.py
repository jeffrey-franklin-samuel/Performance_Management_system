from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
from datetime import datetime


app = Flask(__name__)
CORS(app)

# Function to read data from CSV file
def read_csv():
    data = []
    with open('recommendations.csv', 'r', newline='') as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data.append(row)
    return data

# Function to write data to CSV file
def write_csv(data):
    with open('recommendations.csv', 'w', newline='') as csvfile:
        fieldnames = ['RollNumber', 'RecommendationNumber', 'Recommendation']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)

# Get all recommendations for a specific roll number
@app.route('/getRecommendations/<roll_number>', methods=['GET'])
def get_recommendations(roll_number):
    data = read_csv()
    recommendations = []
    for row in data:
        if row['RollNumber'] == roll_number:
            recommendations.append({'RecommendationNumber': row['RecommendationNumber'], 'Recommendation': row['Recommendation']})
    if recommendations:
        return jsonify({'RollNumber': roll_number, 'Recommendations': recommendations})
    else:
        return jsonify({'error': 'No recommendations found for the given roll number'})

# Add recommendation for a specific roll number
@app.route('/addRecommendation/<roll_number>', methods=['POST'])
def add_recommendation(roll_number):
    data = read_csv()
    recommendation_number = len([row for row in data if row['RollNumber'] == roll_number]) + 1
    recommendation = request.json.get('recommendation')
    
    # Get current date and time
    current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Append date and time to the recommendation
    recommendation_with_datetime = f"{recommendation} (Added On: {current_datetime})"
    
    new_recommendation = {'RollNumber': roll_number, 'RecommendationNumber': str(recommendation_number), 'Recommendation': recommendation_with_datetime}
    data.append(new_recommendation)
    write_csv(data)
    return jsonify({'message': 'Recommendation added successfully'})
# Delete specific recommendation for a specific roll number
@app.route('/deleteRecommendation/<roll_number>', methods=['DELETE'])
def delete_recommendation(roll_number):
    recommendation_number = request.json.get('recommendation_number')
    data = read_csv()
    # Filter out the recommendation to be deleted
    data = [row for row in data if not (row['RollNumber'] == roll_number and row['RecommendationNumber'] == recommendation_number)]
    
    # Reorder the RecommendationNumber for the remaining recommendations
    for index, row in enumerate(data):
        if row['RollNumber'] == roll_number:
            row['RecommendationNumber'] = str(index + 1)
    
    write_csv(data)
    return jsonify({'message': 'Recommendation deleted successfully'})


# Delete all recommendations for a specific roll number
@app.route('/deleteAllRecommendations/<roll_number>', methods=['DELETE'])
def delete_all_recommendations(roll_number):
    data = read_csv()
    data = [row for row in data if not row['RollNumber'] == roll_number]
    write_csv(data)
    return jsonify({'message': 'All recommendations for the given roll number deleted successfully'})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
