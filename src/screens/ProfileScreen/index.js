import React, { useEffect, useState } from "react";
import { TouchableOpacity, SafeAreaView, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-community/google-signin";

GoogleSignin.configure({
  webClientId:
    "257973871141-fh8pu4brnrpns8g4h0736q6ntngnaba8.apps.googleusercontent.com",
});

export default function FacebookSignIn() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged(user) {
    // console.log("auth state changed", user);
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {!user && (
        <>
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() =>
              onFacebookButtonPress().then(() =>
                console.log("Signed in with Facebook!")
              )
            }
          >
            <Text> Sign in with facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log("Signed in with Facebook!")
              )
            }
          >
            <Text> Sign in with Google</Text>
          </TouchableOpacity>
        </>
      )}
      {user && (
        <>
          <TouchableOpacity
          style={{ marginBottom: 20 }}
            onPress={() => onSignout().then(() => setUser(null))}
          >
            <Text>Sign out</Text>
          </TouchableOpacity>
          <Text>Welcome {user.email}</Text>
        </>
      )}
    </SafeAreaView>
  );
}

async function onGoogleButtonPress() {
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

async function onSignout() {
  await LoginManager.logOut();
  await auth().signOut();
  await GoogleSignin.signOut()
  console.log("signed out of Facebook!");
}
async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);

  if (result.isCancelled) {
    throw "User cancelled the login process";
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw "Something went wrong obtaining access token";
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}
