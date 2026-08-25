import os

filepath = 'backend/src/main/java/com/carescribe/backend/controller/PatientController.java'

with open(filepath, 'r') as f:
    content = f.read()

replacement = '''
    @GetMapping("/{id}/history")
    public ResponseEntity<?> getPatientHistory(@PathVariable Long id) {
        // In a real application, this would fetch consultations, vitals, and follow-ups.
        return ResponseEntity.ok("{\"message\": \"History for patient \" + id}");
    }
}
'''

new_content = content.replace('}', replacement, 1)

with open(filepath, 'w') as f:
    f.write(new_content)
