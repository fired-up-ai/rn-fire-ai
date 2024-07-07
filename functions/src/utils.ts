import { onCall } from "firebase-functions/v2/https";
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as cors from 'cors';
admin.initializeApp();


let allowedOrigins: string[] = [];
allowedOrigins = [
  'http://localhost:8100',
  'https://yoga-sadhana-5a729.firebaseapp.com',
  'https://yoga-sadhana-5a729.web.app',
];

const corsOptionsDelegate = function (req: any, callback: any) {
  let corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}

cors(corsOptionsDelegate);

exports.setUserRole = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new Error('Not authenticated');
    }
    const { uid, userRole } = data;
    if (!uid || !userRole) {
      throw new Error('uid and userRole are required');
    }

    // Retrieve the current custom claims for the user
    const user = await admin.auth().getUser(uid);
    const currentClaims = user.customClaims || {};

    // Check if the roles claim exists and if the new role is already part of the roles
    let roles = currentClaims.roles ? [...currentClaims.roles] : [];
    if (!roles.includes(userRole)) {
      // Add the new role to the roles array
      roles.push(userRole);

      // Update the user's custom claims with the modified roles
      await admin.auth().setCustomUserClaims(uid, { ...currentClaims, roles: roles });
    }

    return { message: `Success! ${uid} has been assigned the role: ${userRole}` };
  } catch (error) {
    return { error: "Unable to set userRole: " + error };
  }
});


exports.removeUserRole = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new Error('Not authenticated');
    }
    const { uid, userRole } = data;
    if (!uid || !userRole) {
      throw new Error('uid and userRole are required');
    }

    // Retrieve the current custom claims for the user
    const user = await admin.auth().getUser(uid);
    const currentClaims = user.customClaims || {};

    // Check if the roles claim exists and if the new role is already part of the roles
    let roles = currentClaims.roles ? [...currentClaims.roles] : [];
    if (roles.includes(userRole)) {
      // Add the new role to the roles array
      roles = roles.filter(role => role !== userRole);

      // Update the user's custom claims with the modified roles
      await admin.auth().setCustomUserClaims(uid, { ...currentClaims, roles: roles });
    }

    return { message: `Success! ${uid} has been assigned the role: ${userRole}` };
  } catch (error) {
    return { error: "Unable to set userRole: " + error };
  }
});

// exports.translateText = functions.https.onCall(async (data, context) => {
//   try {
//     if (!context.auth) {
//       throw new Error('Not authenticated');
//     }
//     const { text, targetLanguage } = data;
//     if (!text || !targetLanguage) {
//       throw new Error('text and targetLanguage are required');
//     }

//     // Translate the text using the Google Cloud Translation API
//     const [response] = await admin.translate().translate(text, targetLanguage);
//     return { message: response };
//   } catch (error) {
//     return { error: "Unable to translate text: " + error };
//   }
// });


