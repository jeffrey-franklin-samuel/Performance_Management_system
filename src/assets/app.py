from flask import Flask, jsonify, send_file
import csv
from flask_cors import CORS
import pandas as pd
import joblib
import matplotlib
matplotlib.use('Agg')
import tkinter
tkinter.Tk().withdraw()  # This will prevent a Tk window from popping up
import matplotlib.pyplot as plt
import io
from flask import Flask, render_template, request
import csv
import pandas as pd
import joblib
from flask import Flask, render_template, request, redirect, url_for
import csv
import pandas as pd
import seaborn as sns
import joblib
import numpy as np
import os
import uuid
import threading

student_id = str(uuid.uuid4())
print(student_id)

app = Flask(__name__)
CORS(app)
@app.route('/getDetails')
def index():
    data = read_csv('StudentDetails.csv')
    plot_thread = threading.Thread(target=plot)
    plot_thread.start()
    return jsonify(data)

def read_csv(file_path):
    data = []
    with open('StudentDetails.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data

 
@app.route('/plot')
def plot():
    data = read_csv('StudentDetails.csv')
    df=pd.DataFrame(data)
    
    # Extract relevant fields for plotting
    semesters = ['sem 1', 'sem 2', 'sem 3', 'sem 4']
    projects = ['Project1', 'Project2', 'Project3', 'Project4']
    gpas = ['Semester Predicted GPA', 'Project Predicted GPA']
    project_statuses = ['Project1_Status', 'Project2_Status', 'Project3_Status', 'Project4_Status']
    
    for semester in semesters:
        scores = [float(student[semester]) for student in data]
        
        # Count number of values above 5.0
        above_5_count = sum(1 for score in scores if score > 5.0)
        below_5_count = len(scores) - above_5_count
        
        # Pie chart
        plt.figure(figsize=(8, 6))
        plt.pie([above_5_count, below_5_count], labels=['Above 5.0', 'Below or equal to 5.0'], autopct='%1.1f%%', colors=['green', 'red'])
        plt.title(f'Number of Values Above 5.0 for {semester}')
        plt.savefig(f"./plots/Home/{semester}_Pie")
    # Plot frequency distribution for semesters
    for semester in semesters:
        scores = [float(student[semester]) for student in data]
        plt.figure(figsize=(8, 6))
        sns.histplot(scores, bins=10, kde=True, color='blue')
        plt.title(f'Frequency Distribution of {semester}')
        plt.xlabel(semester)
        plt.ylabel('Frequency')
        plt.grid(True)
        plt.savefig(f"./plots/Home/{semester}")
    
    # Plot frequency distribution for projects
    for project in projects:
        scores = [float(student[project]) for student in data]
        plt.figure(figsize=(8, 6))
        sns.histplot(scores, bins=10, kde=True, color='green')
        plt.title(f'Frequency Distribution of {project}')
        plt.xlabel(project)
        plt.ylabel('Frequency')
        plt.grid(True)
        plt.savefig(f"./plots/Home/{project}") 
    
    # Plot frequency distribution for GPAs
    for gpa in gpas:
        scores = [float(student[gpa]) for student in data]
        plt.figure(figsize=(8, 6))
        sns.histplot(scores, bins=10, kde=True, color='orange')
        plt.title(f'Frequency Distribution of {gpa}')
        plt.xlabel(gpa)
        plt.ylabel('Frequency')
        plt.grid(True)
        plt.savefig(f"./plots/Home/{gpa}")
    
    # Plot frequency distribution for project statuses
    for status in project_statuses:
        plt.figure(figsize=(8, 6))
        
        # Count total late submissions
        total_late = df[df[status] == 'Late'].shape[0]
        
        # Count total submissions
        total_submissions = df[status].notnull().sum()
        
        # Calculate percentage of late submissions
        late_percentage = (total_late / total_submissions) * 100
        
        # Plotting
        sns.barplot(x=[f'Total {status}', f'Total Late {status}'], y=[total_submissions, total_late], palette='pastel')
        plt.title(f'Total Late {status} ({late_percentage:.2f}% of total)')
        plt.ylabel('Count')
        plt.savefig(f"./plots/Home/{status}_Late")
    
    return "Plots generated successfully!"


@app.route('/rank')
def calculate_rank():
    # Read the CSV file to get all records
    csv_file_path = 'StudentDetails.csv'
    all_records = []
    with open(csv_file_path, 'r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            all_records.append(row)

    # Convert relevant fields to numeric types and calculate the average score for each record
    for record in all_records:
        predictions = []
        for key in ['Semester Predicted GPA', 'Project Predicted GPA', 'LogicalTest12', 'Communication12', 'Aptitude12']:
            value = record.get(key, 'NA')
            if value != 'NA':
                predictions.append(float(value))
        
        # Calculate the average of all predictions and test scores
        average_score = np.mean(predictions)
        record['Average Score'] = average_score

    # Sort all records by the average score
    all_records.sort(key=lambda x: x['Average Score'], reverse=True)

    # Assign rank as numbers
    for index, record in enumerate(all_records):
        record['Rank'] = index + 1

    # Write the updated records back to the CSV file
    fieldnames = all_records[0].keys()
    with open(csv_file_path, 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_records)

    return 'done'

# Modify the get_details route to include the rank in the returned data
@app.route('/getDetails/<string:id_or_rollnumber>')
def get_details(id_or_rollnumber):
    data = read_csv('StudentDetails.csv')
    plot_thread = threading.Thread(target=plot_student_data, args=(id_or_rollnumber,))
    plot_thread.start()
    # Find the specific record by ID or roll number
    for record in data:
        if record['ID'] == id_or_rollnumber or record['RollNumber'] == id_or_rollnumber:
            return jsonify(record)
    
    # Return an error message if the student is not found
    return jsonify({'error': 'Student not found'})


@app.route('/plot/<string:id_or_rollnumber>')
def plot_student_data(id_or_rollnumber):
    data = read_csv('StudentDetails.csv')
    student_data = None
    
    # Find the student's data based on ID or roll number
    for record in data:
        if record['ID'] == id_or_rollnumber or record['RollNumber'] == id_or_rollnumber:
            student_data = record
            break
    
    if student_data:
        # Extract relevant fields for plotting
        semesters = ['sem 1', 'sem 2', 'sem 3', 'sem 4','Semester Predicted GPA']
        predicted_gpas = ['Project1','Project2','Project3','Project4', 'Project Predicted GPA']
        tests = ['Aptitude', 'Communication', 'LogicalTest']

        # Prepare data for plotting
        sem_scores = [float(student_data[semester]) for semester in semesters]
        predicted_gpa_scores = [float(student_data[gpa]) for gpa in predicted_gpas]
        
        # Plot student's semester scores and predicted GPAs
        plt.figure(figsize=(10, 6))
        plt.plot(predicted_gpas, predicted_gpa_scores, marker='o', label='Predicted GPAs', color='orange')
        plt.title(f'Project Scores and Predicted GPAs for Student {student_data["Name"]}')
        plt.xlabel('Project / Predicted GPA')
        plt.ylabel('Score / GPA')
        plt.legend()
        plt.grid(True)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f"./plots/student/Project_predicted_gpas.png")
        
        plt.figure(figsize=(10, 6))
        plt.plot(semesters, sem_scores, marker='o', label='Semester Scores', color='blue')
        plt.title(f'Semester Scores and Predicted GPAs for Student {student_data["Name"]}')
        plt.xlabel('Semester / Predicted GPA')
        plt.ylabel('Score / GPA')
        plt.legend()
        plt.grid(True)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f"./plots/student/Semesters_predicted_gpas.png")

        
        # Prepare data for plotting
        sem_scores = [float(student_data[semester]) for semester in semesters]
        
        # Calculate highest, lowest, and average predictions
        highest_pred = max(sem_scores)
        lowest_pred = min(sem_scores)
        avg_pred = np.mean(sem_scores)
        
        # Plot student's semester scores and predicted GPAs
        plt.figure(figsize=(10, 6))
        plt.bar(semesters, sem_scores, color='skyblue')
        plt.title(f'Semester Predictions for Student {student_data["Name"]}')
        plt.xlabel('Semester')
        plt.ylabel('Predicted GPA')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f"./plots/student/semester1-p_predictions.png")

        # Generate a bar chart for highest, lowest, and average predictions
        plt.figure(figsize=(8, 6))
        plt.bar(['Highest', 'Lowest', 'Average'], [highest_pred, lowest_pred, avg_pred], color='lightgreen')
        plt.title(f'Highest, Lowest, and Average Predictions for Student {student_data["Name"]}')
        plt.ylabel('Predicted GPA')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f"./plots/student/Semester_highest_lowest_avg_predictions.png")



        # Prepare data for plotting
        project_scores = [float(student_data[project]) for project in predicted_gpas]
        
        # Calculate highest, lowest, and average predictions
        highest_pred = max(project_scores)
        lowest_pred = min(project_scores)
        avg_pred = np.mean(project_scores)
        
        # Plot student's project scores and predicted GPAs
        plt.figure(figsize=(10, 6))
        plt.bar(predicted_gpas, project_scores, color='lightcoral')
        plt.title(f'Project Predictions for Student {student_data["Name"]}')
        plt.xlabel('Project')
        plt.ylabel('Predicted GPA')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f"./plots/student/project1-4_predictions.png")

        # Generate a bar chart for highest, lowest, and average predictions
        plt.figure(figsize=(8, 6))
        plt.bar(['Highest', 'Lowest', 'Average'], [highest_pred, lowest_pred, avg_pred], color='lightblue')
        plt.title(f'Highest, Lowest, and Average Predictions for Student {student_data["Name"]}')
        plt.ylabel('Predicted GPA')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f"./plots/student/Project_highest_lowest_avg_project_predictions.png")

        aptitude_tests = [f'Aptitude{i}' for i in range(1, 13)]
        communication_tests = [f'Communication{i}' for i in range(1, 13)]
        logical_tests = [f'LogicalTest{i}' for i in range(1, 13)]
        
        # Combine all test types
        all_tests = aptitude_tests + communication_tests + logical_tests

        # Prepare data for plotting
        test_scores = [float(student_data[test]) for test in all_tests]

        # Define custom color palettes for different test types
        aptitude_colors = sns.color_palette("Greens_r", len(aptitude_tests))
        communication_colors = sns.color_palette("Blues_r", len(communication_tests))
        logical_colors = sns.color_palette("Oranges_r", len(logical_tests))

        # Combine the colors for all tests
        test_colors = aptitude_colors + communication_colors + logical_colors

        # Plot student's test scores with custom colors
        plt.figure(figsize=(15, 6))
        sns.barplot(x=all_tests, y=test_scores, palette=test_colors)
        plt.title(f'Test Predictions for Student {student_data["Name"]}')
        plt.xlabel('Test')
        plt.ylabel('Predicted Score')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(f"./plots/student/test_predictions.png")
         # Additional plots comparing student's scores with the overall distribution
        for semester in semesters:
            # Plot student's score against the overall distribution
            plt.figure(figsize=(10, 6))
            sns.histplot(data=[float(student[semester]) for student in data], bins=10, kde=True, color='green', label='Overall Distribution')
            plt.axvline(x=float(student_data[semester]), color='red', linestyle='--', label='Student Score')
            plt.title(f'Student Score vs Overall Distribution for {semester}')
            plt.xlabel('Score')
            plt.ylabel('Frequency')
            plt.legend()
            plt.grid(True)
            plt.savefig(f"./plots/student/{semester}_comparison.png")
        
        for project in predicted_gpas:
            # Plot student's score against the overall distribution
            plt.figure(figsize=(10, 6))
            sns.histplot(data=[float(student[project]) for student in data], bins=10, kde=True, color='blue', label='Overall Distribution')
            plt.axvline(x=float(student_data[project]), color='red', linestyle='--', label='Student Score')
            plt.title(f'Student Score vs Overall Distribution for {project}')
            plt.xlabel('Score')
            plt.ylabel('Frequency')
            plt.legend()
            plt.grid(True)
            plt.savefig(f"./plots/student/{project}_comparison.png")
             # Additional plots comparing student's scores with the overall distribution
        
        
        
        
        for test in tests:
            test_scores = [float(student_data[f'{test}{i}']) for i in range(1, 13)]
            pass_count = sum(1 for score in test_scores if score >= 50)
            fail_count = len(test_scores) - pass_count
            
            plt.figure(figsize=(8, 6))
            plt.pie([fail_count, pass_count], labels=['Fail', 'Pass'], autopct='%1.1f%%', colors=['lightcoral', 'lightgreen'], wedgeprops=dict(width=0.3))
            plt.title(f'Pass/Fail Distribution for {test} Tests')
            plt.savefig(f"./plots/student/{test}_pass_fail_ring.png")

            
            
        

        return "Line chart generated successfully!"
    else:
        return jsonify({'error': 'Student not found'})
        
@app.route('/insert', methods=['POST'])
def insert():
    model = joblib.load('semknn.pkl')
    if request.method == 'POST':
        data = read_csv('StudentDetails.csv')
        if data:
            max_roll_number = max(int(record['RollNumber']) for record in data)
            new_roll_number = max_roll_number + 1
        else:
            new_roll_number = 1
        
        # Function to check if input is provided, else set to 'NA'
        def get_input_or_na(key):
            return request.form.get(key, 'NA')
        
        # Function to convert input to float or 'NA'
        def to_float_or_na(value):
            try:
                return float(value)
            except ValueError:
                return 'NA'
        
        new_data = {
            'ID': student_id,
            'RollNumber': new_roll_number,
            'Name': get_input_or_na('Name'),
            'Age': int(request.form.get('Age', 0)),
            'Course': get_input_or_na('Course'),
            'Address': get_input_or_na('Address'),
            'PhoneNumber': get_input_or_na('PhoneNumber'),
            'FatherName': get_input_or_na('FatherName'),
            'MotherName': get_input_or_na('MotherName'),
            'Income': to_float_or_na(request.form.get('Income', 0)),
            'sem 1': to_float_or_na(request.form.get('sem_1', 0)),
            'sem 2': to_float_or_na(request.form.get('sem_2', 0)),
            'sem 3': to_float_or_na(request.form.get('sem_3', 0)),
            'sem 4': to_float_or_na(request.form.get('sem_4', 0)),
            'Project1': to_float_or_na(request.form.get('Project1', 0)),
            'Project1_Status': get_input_or_na('Project1_Status'),
            'Project2': to_float_or_na(request.form.get('Project2', 0)),
            'Project2_Status': get_input_or_na('Project2_Status'),
            'Project3': to_float_or_na(request.form.get('Project3', 0)),
            'Project3_Status': get_input_or_na('Project3_Status'),
            'Project4': to_float_or_na(request.form.get('Project4', 0)),
            'Project4_Status': get_input_or_na('Project4_Status'),
            'Aptitude1': get_input_or_na('Aptitude1'),
            'Aptitude2': get_input_or_na('Aptitude2'),
            'Aptitude3': get_input_or_na('Aptitude3'),
            'Aptitude4': get_input_or_na('Aptitude4'),
            'Aptitude5': get_input_or_na('Aptitude5'),
            'Aptitude6': get_input_or_na('Aptitude6'),
            'Aptitude7': get_input_or_na('Aptitude7'),
            'Aptitude8': get_input_or_na('Aptitude8'),
            'Aptitude9': get_input_or_na('Aptitude9'),
            'Aptitude10': get_input_or_na('Aptitude10'),
            'Aptitude11': get_input_or_na('Aptitude11'),
            'Aptitude12': get_input_or_na('Aptitude12'),
            'Communication1': get_input_or_na('Communication1'),
            'Communication2': get_input_or_na('Communication2'),
            'Communication3': get_input_or_na('Communication3'),
            'Communication4': get_input_or_na('Communication4'),
            'Communication5': get_input_or_na('Communication5'),
            'Communication6': get_input_or_na('Communication6'),
            'Communication7': get_input_or_na('Communication7'),
            'Communication8': get_input_or_na('Communication8'),
            'Communication9': get_input_or_na('Communication9'),
            'Communication10': get_input_or_na('Communication10'),
            'Communication11': get_input_or_na('Communication11'),
            'Communication12': get_input_or_na('Communication12'),
            'LogicalTest1': get_input_or_na('LogicalTest1'),
            'LogicalTest2': get_input_or_na('LogicalTest2'),
            'LogicalTest3': get_input_or_na('LogicalTest3'),
            'LogicalTest4': get_input_or_na('LogicalTest4'),
            'LogicalTest5': get_input_or_na('LogicalTest5'),
            'LogicalTest6': get_input_or_na('LogicalTest6'),
            'LogicalTest7': get_input_or_na('LogicalTest7'),
            'LogicalTest8': get_input_or_na('LogicalTest8'),
            'LogicalTest9': get_input_or_na('LogicalTest9'),
            'LogicalTest10': get_input_or_na('LogicalTest10'),
            'LogicalTest11': get_input_or_na('LogicalTest11'),
            'LogicalTest12': get_input_or_na('LogicalTest12'),
        }
        
        # Predicting GPA for semester and projects
        sem_values = [new_data[f'sem {i}'] for i in range(1, 5) if new_data[f'sem {i}'] != 'NA']
        project_values = [new_data[f'Project{i}'] for i in range(1, 5) if new_data[f'Project{i}'] != 'NA']
        
        sem_mean = sum(sem_values) / len(sem_values) if sem_values else 'NA'
        project_mean = sum(project_values) / len(project_values) if project_values else 'NA'
        
        new_data['Semester Predicted GPA'] = model.predict([[sem_mean]])[0] if sem_mean != 'NA' else 'NA'
        new_data['Project Predicted GPA'] = model.predict([[project_mean]])[0]*10 if project_mean != 'NA' else 'NA'
        
        write_csv('StudentDetails.csv', new_data)
        calculate_rank()
        return "added"




@app.route('/delete/<int:roll_number>', methods=['DELETE'])
def delete(roll_number):
    if request.method == 'DELETE':
        data = read_csv('StudentDetails.csv')
        updated_data = [record for record in data if int(record['RollNumber']) != roll_number]

        # Rewrite the entire CSV file with the updated data
        delete_csv('StudentDetails.csv', updated_data)
        calculate_rank()
        return f"Deleted record with roll number {roll_number}"


def read_csv(file_path):
    data = []
    if os.path.exists(file_path):
        with open(file_path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                data.append(row)
    return data

def write_csv(file_path, new_data):
    with open(file_path, 'a', newline='') as csvfile:
        fieldnames = [
            'ID', 'RollNumber', 'Name', 'Age', 'Course', 'Address', 'PhoneNumber', 
            'FatherName', 'MotherName', 'Income', 
            'sem 1', 'sem 2', 'sem 3', 'sem 4', 'Semester Predicted GPA', 
            'Project1', 'Project2', 'Project3', 'Project4', 
            'Project1_Status', 'Project2_Status', 'Project3_Status', 'Project4_Status', 'Project Predicted GPA', 
            'Aptitude1', 'Aptitude2', 'Aptitude3', 'Aptitude4', 'Aptitude5', 'Aptitude6', 'Aptitude7', 'Aptitude8', 'Aptitude9', 'Aptitude10', 'Aptitude11', 'Aptitude12', 
            'Communication1', 'Communication2', 'Communication3', 'Communication4', 'Communication5', 'Communication6', 'Communication7', 'Communication8', 'Communication9', 'Communication10', 'Communication11', 'Communication12', 
            'LogicalTest1', 'LogicalTest2', 'LogicalTest3', 'LogicalTest4', 'LogicalTest5', 'LogicalTest6', 'LogicalTest7', 'LogicalTest8', 'LogicalTest9', 'LogicalTest10', 'LogicalTest11', 'LogicalTest12','Average Score','Rank'
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if csvfile.tell() == 0:
            writer.writeheader()
        writer.writerow(new_data)

def delete_csv(file_path, data):
    with open(file_path, 'w', newline='') as csvfile:
        fieldnames = [
            'ID', 'RollNumber', 'Name', 'Age', 'Course', 'Address', 'PhoneNumber', 
            'FatherName', 'MotherName', 'Income', 
            'sem 1', 'sem 2', 'sem 3', 'sem 4', 'Semester Predicted GPA', 
            'Project1', 'Project2', 'Project3', 'Project4', 
            'Project1_Status', 'Project2_Status', 'Project3_Status', 'Project4_Status', 'Project Predicted GPA', 
            'Aptitude1', 'Aptitude2', 'Aptitude3', 'Aptitude4', 'Aptitude5', 'Aptitude6', 'Aptitude7', 'Aptitude8', 'Aptitude9', 'Aptitude10', 'Aptitude11', 'Aptitude12', 
            'Communication1', 'Communication2', 'Communication3', 'Communication4', 'Communication5', 'Communication6', 'Communication7', 'Communication8', 'Communication9', 'Communication10', 'Communication11', 'Communication12', 
            'LogicalTest1', 'LogicalTest2', 'LogicalTest3', 'LogicalTest4', 'LogicalTest5', 'LogicalTest6', 'LogicalTest7', 'LogicalTest8', 'LogicalTest9', 'LogicalTest10', 'LogicalTest11', 'LogicalTest12','Average Score','Rank'
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        # Reorder roll numbers
        for i, row in enumerate(data):
            writer.writerow(row)



@app.route('/edit/<int:roll_number>', methods=['POST'])
def edit(roll_number):
    model = joblib.load('semknn.pkl')

    if request.method == 'POST':
        data = read_csv('StudentDetails.csv')
        updated_data = []
        
        # Update the specific record
        for record in data:
            if int(record['RollNumber']) == roll_number:
                record['Name'] = request.form.get('Name', record['Name'])
                record['Age'] = int(request.form.get('Age', record['Age']))
                record['Course'] = request.form.get('Course', record['Course'])
                record['Address'] = request.form.get('Address', record['Address'])
                record['PhoneNumber'] = request.form.get('PhoneNumber', record['PhoneNumber'])
                record['FatherName'] = request.form.get('FatherName', record['FatherName'])
                record['MotherName'] = request.form.get('MotherName', record['MotherName'])
                record['Income'] = float(request.form.get('Income', record['Income']))
                
                # Update semester scores
                for i in range(1, 5):
                    key = f'sem {i}'
                    record[key] = float(request.form.get(key, record[key]))
                
                # Update project scores and statuses
                for i in range(1, 5):
                    key = f'Project{i}'
                    status_key = f'Project{i}_Status'
                    record[key] = float(request.form.get(key, record[key]))
                    record[status_key] = request.form.get(status_key, record[status_key])
                
                # Update test scores
                for test_type in ['Aptitude', 'Communication', 'LogicalTest']:
                    for i in range(1, 13):
                        key = f'{test_type}{i}'
                        record[key] = request.form.get(key, record[key])

                # Predict GPA for semester and projects
                sem_values = [record[f'sem {i}'] for i in range(1, 5)]
                project_values = [record[f'Project{i}'] for i in range(1, 5)]
                
                sem_mean = sum(sem_values) / len(sem_values)
                project_mean = sum(project_values) / len(project_values)
                
                record['Semester Predicted GPA'] = model.predict([[sem_mean]])[0]
                record['Project Predicted GPA'] = model.predict([[project_mean]])[0]*10

                record['Average Score'] =""
                record['Rank'] = ""

            updated_data.append(record)

        # Rewrite the entire CSV file with the updated data
        delete_csv('StudentDetails.csv', updated_data)
        calculate_rank()

    return "updated"



if __name__ == "__main__":
    app.run(debug=True)
