# 💸 Splitwise-Style Expense Split Backend

This is a Node.js + Express.js backend API for managing shared group expenses. It allows users to add expenses, track who paid, automatically calculate balances, and generate simplified settlements — similar to apps like Splitwise.

---

## 📌 Features

- ✅ Add, edit, delete shared expenses
- ✅ Track participants and split amount equally
- ✅ Auto-calculate how much each person owes or is owed
- ✅ Simplified settlement (minimize number of transactions)
- ✅ View unique participants (people)
- ✅ Clean RESTful APIs tested with Postman
- ✅ MongoDB Atlas cloud database

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **API Testing:** Postman
- **Deployment:** Railway (optional)

---

## 📂 API Endpoints

### 🔸 Expense Management
| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| POST   | `/api/expenses`          | Add a new expense        |
| GET    | `/api/expenses`          | List all expenses        |
| PUT    | `/api/expenses/:id`      | Update an expense        |
| DELETE | `/api/expenses/:id`      | Delete an expense        |

### 🔸 Calculations & Utilities
| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/api/people`        | List all participants          |
| GET    | `/api/balances`      | Net balance for each person   |
| GET    | `/api/settlements`   | Who should pay whom           |

---

## 🧪 Postman Collection

🧾 View the public Postman collection here:  
👉 [Postman Gist](https://gist.github.com/SudarshanKolhe07/548a0ef65379603c6489ead199b200c7)

Includes:
- Sample test data (Shantanu, Sanket, Om)
- Edge case requests
- CRUD + calculation endpoints

---

## 🚀 Getting Started Locally


```markdown
## 🚀 Getting Started Locally

### 1. Clone the Repo
```bash
git clone https://github.com/SudarshanKolhe07/splitwise-backend.git
cd splitwise-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
Create a `.env` file in the root folder and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the Server
```bash
node server.js
```

Server will start on:  
👉 `http://localhost:5000`
```

