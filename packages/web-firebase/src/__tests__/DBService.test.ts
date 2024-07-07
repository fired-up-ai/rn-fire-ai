import { 
    initializeTestEnvironment, 
    RulesTestEnvironment 
} from "@firebase/rules-unit-testing";

import DBService from "../services/DBService";

beforeAll(async () => {
    // Set up the test environment before running the tests.
    // This will trigger the emulator to start and link with Firebase Project
    await initializeTestEnvironment({
        projectId: process.env.FIREBASE_PROJECT_ID
    });
});

describe("DBService", () => {

    const dbService: DBService = new DBService();
    
    test("createDoc", async () => {
        const collectionName = "users";
        const data = {
            name: "Test User",
            email: "testuser@gmail.com",
            age: 25
        };
        const docRef = await dbService.createDoc(collectionName, data);
        expect(docRef).toBeDefined();
       
    });

    test("getDoc", async () => {
        const collectionName = "users";
        const docId = "123456";
        const doc = await dbService.getDoc(collectionName, docId);
        expect(doc).toBeUndefined();
    });

    test("getDocs", async () => {
        const collectionName = "users";
        const docs = await dbService.getDocs(collectionName);
        expect(docs).toBeDefined();
    });

});