#!/bin/bash
# Run this in Git Bash or WSL to seed data via API
# Backend must be running on 5000

echo "Inserting 10 students..."

curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S001","lrn":"123456789012","full_name":"Juan Dela Cruz","grade":"Grade 1","section":"Star","sex":"Male","date_of_birth":"2019-05-15","guardian":"Maria Dela Cruz","contact_number":"09171234567","beneficiary":1,"has_allergy":0
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S002","lrn":"123456789013","full_name":"Maria Santos","grade":"Grade 1","section":"Moon","sex":"Female","date_of_birth":"2019-06-20","guardian":"Pedro Santos","contact_number":"09172345678","beneficiary":1,"has_allergy":1,"allergy_notes":"Peanut allergy"
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S003","lrn":"123456789014","full_name":"Pedro Garcia","grade":"Grade 2","section":"Sun","sex":"Male","date_of_birth":"2018-08-10","guardian":"Ana Garcia","contact_number":"09173456789","beneficiary":1,"has_allergy":0
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S004","lrn":"123456789015","full_name":"Ana Reyes","grade":"Grade 2","section":"Cloud","sex":"Female","date_of_birth":"2018-04-25","guardian":"Jose Reyes","contact_number":"09174567890","beneficiary":0,"has_allergy":0
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S005","lrn":"123456789016","full_name":"Luis Mendoza","grade":"Grade 3","section":"Star","sex":"Male","date_of_birth":"2017-11-30","guardian":"Carmen Mendoza","contact_number":"09175678901","beneficiary":1,"has_allergy":0
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S006","lrn":"123456789017","full_name":"Sofia Lopez","grade":"Grade 3","section":"Moon","sex":"Female","date_of_birth":"2017-09-12","guardian":"Miguel Lopez","contact_number":"09176789012","beneficiary":1,"has_allergy":0
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S007","lrn":"123456789018","full_name":"Carlo Villanueva","grade":"Grade 4","section":"Sun","sex":"Male","date_of_birth":"2016-03-05","guardian":"Luz Villanueva","contact_number":"09177890123","beneficiary":1,"has_allergy":1,"allergy_notes":"Dairy allergy"
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S008","lrn":"123456789019","full_name":"Julia Tan","grade":"Grade 4","section":"Cloud","sex":"Female","date_of_birth":"2016-07-18","guardian":"Henry Tan","contact_number":"09178901234","beneficiary":0,"has_allergy":0
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S009","lrn":"123456789020","full_name":"Mark Ramos","grade":"Grade 5","section":"Star","sex":"Male","date_of_birth":"2015-12-22","guardian":"Rosa Ramos","contact_number":"09179012345","beneficiary":1,"has_allergy":0
}'
curl -X POST http://localhost:5000/api/students -H "Content-Type: application/json" -d '{
  "student_id":"S010","lrn":"123456789021","full_name":"Lara Cruz","grade":"Grade 6","section":"Moon","sex":"Female","date_of_birth":"2015-02-14","guardian":"Victor Cruz","contact_number":"09180123456","beneficiary":1,"has_allergy":0
}'

echo "Students inserted. Verifying..."
curl http://localhost:5000/api/students | jq '. | length'

echo "Inserting measurements and attendance next would follow similar pattern..."

