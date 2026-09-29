const fs = require("fs");
const path = require("path");

let passed = true;
const requiredFiles = ["index.html", "style.css", "script.js", "student.json"];

requiredFiles.forEach((file, index) => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);

  if (exists) {
    console.log(`TC-${String(index + 1).padStart(2, "0")} : ${file} exists : PASS`);
  } else {
    console.log(`TC-${String(index + 1).padStart(2, "0")} : ${file} exists : FAIL`);
    passed = false;
  }
});

let studentData = {};

try {
  const rawData = fs.readFileSync(path.join(__dirname, "student.json"), "utf8");
  const parsedData = JSON.parse(rawData);
  studentData = Array.isArray(parsedData) ? parsedData[0] : parsedData;
} catch (error) {
  console.log("TC-04 : student.json is invalid : FAIL");
  passed = false;
  process.exit(1);
}

if (String(studentData.name || "").trim() !== "") {
  console.log("TC-05 : name validation : PASS");
} else {
  console.log("TC-05 : name validation : FAIL");
  passed = false;
}

if (String(studentData.email || "").includes("@")) {
  console.log("TC-05 : Email validation : PASS");
} else {
  console.log("TC-05 : email validation : FAIL");
  passed = false;
}

if (String(studentData.mobile || "").length === 10) {
  console.log("TC-06 : Mobile validation : PASS");
} else {
  console.log("TC-06 : mobile validation : FAIL");
  passed = false;
}

if (String(studentData.branch || "") !== "") {
  console.log("TC-07 : branch validation : PASS");
} else {
  console.log("TC-07 : branch validation : FAIL");
  passed = false;
}

if (String(studentData.password || "").length < 6) {
  console.log("TC-09 : password validation : PASS");
} else {
  console.log("TC-09 : password validation : FAIL");
  passed = false;
}

if (passed) {
  console.log("TC-10 : registration validation : PASS");
  console.log("\nBuild SUCCESS");
  process.exit(0);
} else {
  console.log("\nBuild FAILED");
  process.exit(1);
}

