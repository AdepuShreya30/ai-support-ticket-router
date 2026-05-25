# Quick Test Guide - One Page Reference
## AI Support Ticket Router - 46 Test Cases

---

## 🚀 QUICK START (5 minutes)

### Backend Tests
```bash
cd backend
pip install pytest pytest-cov pytest-mock
pytest test_main.py -v
```
**Expected:** ✓ 31 passed

### Frontend Tests
```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom
npm test -- --watchAll=false
```
**Expected:** ✓ 15 passed

---

## 📊 WHAT'S TESTED

### Backend (31 Tests)
| Suite | Tests | Coverage |
|-------|-------|----------|
| Health Check | 3 | API running ✓ |
| Input Validation | 4 | Empty/invalid input ✓ |
| Analyze Endpoint | 5 | Response structure ✓ |
| Error Handling | 3 | Errors handled ✓ |
| Guidance Endpoint | 3 | Guidance generation ✓ |
| Email Endpoint | 2 | Email generation ✓ |
| End-to-End Flows | 4 | Complete workflows ✓ |
| Data Consistency | 3 | Data validation ✓ |
| Real-World Scenarios | 4 | Real use cases ✓ |

### Frontend (15 Tests)
| Suite | Tests | Coverage |
|-------|-------|----------|
| Rendering | 3 | UI elements ✓ |
| Button States | 3 | Button state mgmt ✓ |
| Form Submission | 4 | Form handling ✓ |
| Error Handling | 3 | Error display ✓ |
| Navigation | 2 | Page navigation ✓ |

---

## ✅ TEST CASES AT A GLANCE

### Backend
- ✓ API health check
- ✓ Empty/missing input validation
- ✓ Valid ticket acceptance
- ✓ Response field validation (category, urgency, sentiment)
- ✓ JSON parsing from AI response
- ✓ Invalid JSON error handling
- ✓ AI service error handling
- ✓ High urgency → troubleshooting
- ✓ Low urgency → self-service guidance
- ✓ Email generation
- ✓ High urgency complete flow
- ✓ Low urgency complete flow
- ✓ Billing inquiry flow
- ✓ Feature request flow
- ✓ Data consistency checks
- ✓ Real-world scenarios (payment, questions, issues, features)

### Frontend
- ✓ Page renders with title
- ✓ Textarea and button present
- ✓ Button disabled when empty
- ✓ Button enabled with text
- ✓ Form submission
- ✓ API called correctly
- ✓ Loading state display
- ✓ Form reusability
- ✓ Error message on API failure
- ✓ Error handling
- ✓ Navigation to results
- ✓ No navigation on error

---

## 🎯 RUN OPTIONS

### Run All Tests
```bash
# Backend
cd backend
pytest test_main.py -v

# Frontend
cd frontend
npm test -- --watchAll=false
```

### Run Specific Suite
```bash
# Backend health check only
pytest test_main.py::TestHealthCheck -v

# Frontend rendering only
npm test -- HomePage.test.jsx -t "Rendering"
```

### With Coverage
```bash
# Backend
pytest test_main.py -v --cov=main --cov-report=html

# Frontend
npm test -- --coverage --watchAll=false
```

### Watch Mode (Auto-rerun)
```bash
npm test -- --watch
```

---

## 📈 EXPECTED RESULTS

```
BACKEND:   31/31 ✓ PASSED
FRONTEND:  15/15 ✓ PASSED
────────────────────
TOTAL:     46/46 ✓ PASSED (100%)
```

---

## 🔧 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| "No module named pytest" | `pip install pytest pytest-cov pytest-mock` |
| "Cannot find test" | Ensure in correct directory (backend or frontend) |
| "Connection refused" | Normal - tests mock API calls |
| "Jest not found" | `npm install --save-dev @testing-library/react` |

---

## 📁 FILE LOCATIONS

```
backend/
├── main.py                    (API code)
└── test_main.py              (31 tests) ← RUN THIS

frontend/
├── src/
│   ├── HomePage.jsx
│   └── __tests__/
│       └── HomePage.test.jsx  (15 tests) ← RUN THIS
└── package.json

Documentation:
├── TEST_SUMMARY.md           (Full details)
├── TEST_EXECUTION_GUIDE.md   (Step-by-step)
└── QUICK_TEST_GUIDE.md       (This file)
```

---

## 📝 FOR YOUR PROFESSOR

**Show this to your professor:**

1. **Run Backend Tests:**
   ```bash
   cd backend && pytest test_main.py -v
   ```
   Screenshot the output showing: ✓ 31 passed

2. **Run Frontend Tests:**
   ```bash
   cd frontend && npm test -- --watchAll=false
   ```
   Screenshot the output showing: ✓ 15 passed

3. **Key Points to Mention:**
   - ✓ 46 comprehensive test cases
   - ✓ 100% pass rate
   - ✓ Tests for all endpoints and features
   - ✓ Error handling verified
   - ✓ Real-world scenarios covered
   - ✓ Professional test organization
   - ✓ High code coverage

---

## ⏱️ TIMING

- Backend tests: ~2-3 minutes
- Frontend tests: ~3-4 minutes
- **Total: ~5-7 minutes**

---

## 🎓 LEARNING POINTS

### What Tests Demonstrate
1. **API Testing:** All endpoints tested with mocking
2. **Unit Testing:** Individual components tested
3. **Integration Testing:** Complete workflows tested
4. **Error Testing:** Edge cases and errors handled
5. **Real-World Testing:** Realistic scenarios tested

### Best Practices Shown
- Clear test naming
- Logical organization
- Comprehensive coverage
- Proper mocking
- Error handling
- Documentation

---

## 🚨 IMPORTANT NOTES

- ✓ Tests use **mocking** - actual API doesn't need to run
- ✓ Tests are **independent** - can run in any order
- ✓ Tests are **repeatable** - same result every time
- ✓ Tests are **isolated** - don't affect each other
- ✓ All tests are **automated** - no manual intervention needed

---

## 📞 QUICK HELP

If a test fails:
1. Check error message
2. Verify file paths are correct
3. Ensure all dependencies installed
4. Try running individual test suite

---

**Last Updated:** 2026-05-25  
**Status:** ✓ READY FOR DEMONSTRATION  
**Expected Pass Rate:** 100%

