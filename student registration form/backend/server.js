const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'students.json');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // To parse form submissions

// Helper to read JSON file safely
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return data ? JSON.parse(data) : [];
};

// Helper to write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// 1. GET: Registration Page
app.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// 2. POST: Handle Registration (Save to JSON)
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const students = readData();

    // Check if student already exists
    if (students.find(s => s.email === email)) {
        return res.render('register', { error: 'Email already registered!' });
    }

    students.push({ name, email, password });
    writeData(students);
    res.redirect('/login');
});

// 3. GET: Login Page
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// 4. POST: Handle Login (Read from JSON)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const students = readData();

    const student = students.find(s => s.email === email && s.password === password);
    
    if (!student) {
        return res.render('login', { error: 'Invalid Email or Password!' });
    }

    // Redirect to welcome screen with username encoded in URL
    res.redirect(`/welcome?name=${encodeURIComponent(student.name)}`);
});

// 5. GET: Welcome Page
app.get('/welcome', (req, res) => {
    const studentName = req.query.name || 'Student';
    res.render('welcome', { name: studentName });
});

// Root path redirect
app.get('/', (req, res) => res.redirect('/register'));

app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));
