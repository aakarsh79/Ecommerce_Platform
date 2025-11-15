# How to Start the Application

## Option 1: Using PowerShell Scripts (Easiest)

### Step 1: Start Backend
Open a PowerShell terminal and run:
```powershell
.\start-backend.ps1
```

### Step 2: Start Frontend (in a NEW terminal)
Open another PowerShell terminal and run:
```powershell
.\start-frontend.ps1
```

---

## Option 2: Manual Terminal Commands

### Terminal 1: Backend Server
```powershell
cd "C:\Users\aakarsh\OneDrive\Desktop\Ecommerce\Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS-main\server"
node app.js
```

### Terminal 2: Frontend Server
```powershell
cd "C:\Users\aakarsh\OneDrive\Desktop\Ecommerce\Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS-main"
npm run dev
```

---

## Access the Application

- **Frontend (Shop)**: http://localhost:3000
- **Backend API**: http://localhost:3001

---

## Important Notes

1. **Both terminals must stay open** - Closing them will stop the servers
2. **Start backend first**, then frontend
3. **Make sure MySQL is running** before starting the backend
4. To stop servers, press `Ctrl+C` in each terminal

---

## Troubleshooting

### Port already in use?
- If port 3000 or 3001 is already in use, you'll need to stop the existing process first
- Use `netstat -ano | findstr :3000` or `netstat -ano | findstr :3001` to find the process
- Kill the process using Task Manager or `taskkill /PID <process_id> /F`

### Database connection errors?
- Make sure MySQL is running
- Verify your `.env` files have correct database credentials
- Check that the database `singitronic_nextjs` exists

