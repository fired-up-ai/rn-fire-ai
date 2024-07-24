import { 
    initializeTestEnvironment, 
    RulesTestEnvironment 
} from "@firebase/rules-unit-testing";

import DBService from "../services/DBService";
import AuthService from "../services/AuthService";
import { UserCredential } from "firebase/auth";

let testEnv: RulesTestEnvironment;
let userCredential: UserCredential;
beforeAll(async () => {
    // Set up the test environment before running the tests.
    // This will trigger the emulator to start and link with Firebase Project
    testEnv = await initializeTestEnvironment({
        projectId: process.env.FIREBASE_PROJECT_ID
    });
    const authService: AuthService = new AuthService();
    userCredential = await authService.signInAnonymously();
});

afterAll(async () => {
    // Tear down the test environment after tests are done.
    // This will trigger the emulator to stop
    // await testEnv.cleanup()
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