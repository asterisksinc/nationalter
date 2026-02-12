/**
 * Test Scripts for NationCite Registration and Admin Workflow
 * 
 * Run with: node scripts/test-registration-flow.mjs
 * 
 * Prerequisites:
 * - Server running on localhost:3001
 * - Database seeded with admin user and pre-seeded data
 */

const BASE_URL = process.env.API_URL || "http://localhost:3001";

// Test data
const testResearcher = {
  type: "RESEARCHER",
  name: "Dr. Test Researcher",
  email: "test.researcher@university.edu",
  mobile: "9876543210",
  institute: "Test University",
  instituteEmail: "test.researcher@university.edu",
  orcidId: "0000-0002-1234-5678",
  institutionalIdCardUrl: "https://example.com/id.pdf",
  primaryDomain: "Computer Science",
  googleScholarUrl: "https://scholar.google.com/test",
  profilePhotoUrl: "https://example.com/photo.jpg",
};

const testMedical = {
  type: "MEDICAL",
  name: "Dr. Test Medical",
  email: "test.medical@hospital.org",
  mobile: "9876543211",
  medCouncilRegNo: "MCI-TEST-001",
  stateCouncil: "Delhi Medical Council",
  primaryHospital: "Test Hospital",
  specialty: "Cardiology",
  researchFocus: "Clinical Trials",
  medicalDegreeUrl: "https://example.com/degree.pdf",
  regCertificateUrl: "https://example.com/cert.pdf",
};

const testOrganization = {
  name: "Test University Corp",
  domain: "testuniversity.edu",
  email: "admin@testuniversity.edu",
  number: "9876543212",
  letterOfAuthorizationUrl: "https://example.com/auth.pdf",
  accreditationProofUrl: "https://example.com/accred.pdf",
};

// Helper functions
async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  
  const data = await response.json();
  return { status: response.status, data };
}

function logResult(testName, passed, details = "") {
  const status = passed ? "PASS" : "FAIL";
  const icon = passed ? "[OK]" : "[X]";
  console.log(`${icon} ${testName}: ${status}${details ? ` - ${details}` : ""}`);
  return passed;
}

// Test cases
async function testResearcherRegistration() {
  console.log("\n--- Test: Researcher Registration ---");
  
  const { status, data } = await makeRequest("/api/registration/scholars", {
    method: "POST",
    body: JSON.stringify(testResearcher),
  });
  
  const passed = status === 201 && data.success && data.data?.ticketId;
  logResult("Researcher registration", passed, data.data?.ticketId);
  
  return data.data?.ticketId;
}

async function testMedicalRegistration() {
  console.log("\n--- Test: Medical Professional Registration ---");
  
  const { status, data } = await makeRequest("/api/registration/scholars", {
    method: "POST",
    body: JSON.stringify(testMedical),
  });
  
  const passed = status === 201 && data.success && data.data?.ticketId;
  logResult("Medical registration", passed, data.data?.ticketId);
  
  return data.data?.ticketId;
}

async function testOrganizationRegistration() {
  console.log("\n--- Test: Organization Registration ---");
  
  const { status, data } = await makeRequest("/api/registration/orgs", {
    method: "POST",
    body: JSON.stringify(testOrganization),
  });
  
  const passed = status === 201 && data.success && data.data?.ticketId;
  logResult("Organization registration", passed, data.data?.ticketId);
  
  return data.data?.ticketId;
}

async function testGetRegistrationRequests(cookie) {
  console.log("\n--- Test: Fetch Registration Requests ---");
  
  const { status, data } = await makeRequest("/api/registration/requests", {
    headers: { Cookie: cookie },
  });
  
  const passed = status === 200 && data.success && Array.isArray(data.data);
  logResult("Fetch registration requests", passed, `Count: ${data.count}`);
  
  return data.data;
}

async function testGetCompareData(ticketId, cookie) {
  console.log("\n--- Test: Fetch Compare Data ---");
  
  const { status, data } = await makeRequest(`/api/registration/compare/${ticketId}`, {
    headers: { Cookie: cookie },
  });
  
  const passed = status === 200 && data.success && data.data?.registration;
  logResult("Fetch compare data", passed, `Type: ${data.data?.registration?.type}`);
  
  return data.data;
}

async function testApproveRegistration(ticketId, nationciteId, cookie) {
  console.log("\n--- Test: Approve Registration ---");
  
  const { status, data } = await makeRequest("/api/tickets/registration-approve", {
    method: "PATCH",
    headers: { Cookie: cookie },
    body: JSON.stringify({ ticketId, nationciteId }),
  });
  
  const passed = status === 200 && data.success;
  logResult("Approve registration", passed, data.message);
  
  return passed;
}

async function testRejectRegistration(ticketId, cookie) {
  console.log("\n--- Test: Reject Registration ---");
  
  const { status, data } = await makeRequest("/api/registration/reject", {
    method: "PATCH",
    headers: { Cookie: cookie },
    body: JSON.stringify({ ticketId, reason: "Test rejection" }),
  });
  
  const passed = status === 200 && data.success;
  logResult("Reject registration", passed, data.message);
  
  return passed;
}

async function testAdminLogin(email, password) {
  console.log("\n--- Test: Admin Login ---");
  
  const { status, data } = await makeRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  
  const passed = status === 200 && data.success;
  logResult("Admin login", passed, data.message);
  
  // Extract cookies from response (simplified for testing)
  return passed ? `nationciteId=${data.token}; userRole=ADMIN` : null;
}

async function testValidationErrors() {
  console.log("\n--- Test: Validation Errors ---");
  
  // Missing required fields
  const { status, data } = await makeRequest("/api/registration/scholars", {
    method: "POST",
    body: JSON.stringify({ type: "RESEARCHER" }), // Missing required fields
  });
  
  const passed = status === 400 && !data.success;
  logResult("Validation rejects incomplete data", passed, data.message);
  
  return passed;
}

// Main test runner
async function runTests() {
  console.log("=================================================");
  console.log("NationCite Registration Flow Tests");
  console.log("=================================================");
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Time: ${new Date().toISOString()}`);
  
  const results = {
    passed: 0,
    failed: 0,
  };
  
  try {
    // Test validation
    if (await testValidationErrors()) results.passed++; else results.failed++;
    
    // Test registrations
    const researcherTicket = await testResearcherRegistration();
    if (researcherTicket) results.passed++; else results.failed++;
    
    const medicalTicket = await testMedicalRegistration();
    if (medicalTicket) results.passed++; else results.failed++;
    
    const orgTicket = await testOrganizationRegistration();
    if (orgTicket) results.passed++; else results.failed++;
    
    console.log("\n=================================================");
    console.log("Admin Operations (requires admin login)");
    console.log("=================================================");
    console.log("Note: Admin tests require valid admin credentials.");
    console.log("Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables.");
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (adminEmail && adminPassword) {
      const cookie = await testAdminLogin(adminEmail, adminPassword);
      
      if (cookie) {
        results.passed++;
        
        // Test fetch requests
        const requests = await testGetRegistrationRequests(cookie);
        if (requests) results.passed++; else results.failed++;
        
        // Test compare data
        if (researcherTicket) {
          const compareData = await testGetCompareData(researcherTicket, cookie);
          if (compareData) results.passed++; else results.failed++;
        }
        
        // Note: Approval/rejection tests commented to avoid modifying test data
        // Uncomment for full integration testing
        // if (researcherTicket) {
        //   await testApproveRegistration(researcherTicket, "SC0000001", cookie);
        // }
      } else {
        results.failed++;
      }
    } else {
      console.log("Skipping admin tests - credentials not provided");
    }
    
  } catch (error) {
    console.error("\nTest execution error:", error.message);
    results.failed++;
  }
  
  console.log("\n=================================================");
  console.log("Test Results Summary");
  console.log("=================================================");
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Total:  ${results.passed + results.failed}`);
  
  process.exit(results.failed > 0 ? 1 : 0);
}

runTests();
