import { signInWithPopup } from "firebase/auth";
import AuthService from "../services/AuthService";
import { 
    initializeTestEnvironment, 
    RulesTestEnvironment 
} from "@firebase/rules-unit-testing";

jest.mock('firebase/auth', () => {
   const originalModule = jest.requireActual('firebase/auth');
    return {
        ...originalModule,
        signInWithPopup: jest.fn(),
    }; 
});

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
    // Set up the test environment before running the tests.
    // This will trigger the emulator to start and link with Firebase Project
    testEnv = await initializeTestEnvironment({
        projectId: process.env.FIREBASE_PROJECT_ID
    });
    
});

afterAll(async () => {
    // Tear down the test environment after tests are done.
    // This will trigger the emulator to stop
    await testEnv.cleanup()
});


describe("AuthService", () => {

    const authService: AuthService = new AuthService();
    
    test("signUpWithEmail", async () => {
        const email = "testuser@gmail.com";
        const password = "password";
        const userCredential = await authService.signUpWithEmail(email, password);
        expect(userCredential.user).toBeDefined();
    });

    test("signInWithEmail", async () => {
        const email = "testuser@gmail.com";
        const password = "password";
        const userCredential = await authService.signInWithEmail(email, password);
        expect(userCredential.user).toBeDefined();
    });

    test("getUser", async () => {
        const user = authService.getUser();
        expect(user).toBeDefined();
    })

    test("signInAnonymously", async () => {
        const userCredential = await authService.signInAnonymously();
        expect(userCredential.user).toBeDefined();
    });

    test("getUserToken", async () => {
        const token = await authService.getUserToken();
        expect(token).toBeDefined();
    });

    test("signOut", async () => {
        await authService.signOut();
        expect(authService.getUser()).toBeNull();
    });

    test('signInWithGoogle', async () => {
        const mockUserCredential = { user: { uid: '123', email: 'foo@example.com' } };
        (signInWithPopup as jest.Mock).mockResolvedValueOnce(mockUserCredential);
    
        const userCredential = await authService.signInWithGoogle();
        expect(userCredential.user).toBeDefined();
        expect(userCredential.user.email).toBe('foo@example.com');
    });
    
    test('signInWithGithub', async () => {
        const mockUserCredential = { user: { uid: '123', email: 'foo@example.com' } };
        (signInWithPopup as jest.Mock).mockResolvedValueOnce(mockUserCredential);

        const userCredential = await authService.signInWithGithub();
        expect(userCredential.user).toBeDefined();
        expect(userCredential.user.email).toBe('foo@example.com');
    });

    test('signUpWithEmail - user already exists', async () => {
        const email = 'testuser@gmail.com';
        const password = 'password';
        try {
          await authService.signUpWithEmail(email, password);
        } catch (error: any) {
          expect(error.code).toBe('auth/email-already-in-use');
        }
    });
});
