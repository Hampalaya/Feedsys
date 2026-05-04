# Feed System Realistic Data Insertion - TODO

## Plan Steps:
1. **✅ Verify database connection** - Backend health check shows DB connected (server running on 5000).
2. **✅ Check current data counts** - Users:3, Students:0, Measurements:0, Attendance:0 via APIs.
3. **✅ Created seed_data.sql** - 10 students + 20 measurements + 30 attendance (direct MySQL inserts).
4. **✅ Created insert_seed.sh** - API POST scripts for students (use Git Bash).
5. **🔄 Run seed** - mysql -u root feed_system < seed_data.sql  OR bash insert_seed.sh.
6. **🔄 Verify inserts** - curl /api/students etc.
7. **✅ Backend running** (port 5000).
8. **✅ Frontend running** (port 5175).
9. **🔄 Test UI** - http://localhost:5175/student-profiles, login admin/admin.
10. **✅ Complete**.

*Servers running. Run seed command and confirm data in phpMyAdmin/UI.*
