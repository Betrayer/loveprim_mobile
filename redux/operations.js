import types from "./types";
import { auth, firestore } from "../firebase/config";

export const registerUser = (param, setError, setErrorId) => async (
  dispatch
) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(
      param.email,
      param.password
    );
    await user.user
      .updateProfile({
        displayName: param.name,
      })
      .then(setError(true));
    const currentUser = await auth.currentUser;
    await firestore.collection("users").add({
      admin: false,
      userEmail: currentUser.email,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      userPhone: param.phone,
      userAdress: "",
      userBonus: 0,
    });
    await dispatch({
      type: types.REGISTR_USER,
      payload: {
        admin: false,
        userEmail: currentUser.email,
        userId: currentUser.uid,
        userName: currentUser.displayName,
        userPhone: param.phone,
        userAdress: "",
        userBonus: 0,
      },
    });
  } catch (error) {
    setError(false);
    setErrorId("Пользователь существует или введена не правильная информация");
  }
};

export const loginUser = (param, setError, setErrorId) => async (dispatch) => {
  console.log(param)
  try {
    await auth.signInWithEmailAndPassword(param.email, param.password);
    const currentUser = await auth.currentUser;
    let dataData = {};
    await firestore
      .collection("users")
      .where("userId", "==", currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          dataData = doc.data();
        });
      })
      .then(setError(true))
      .then(console.log(dataData))
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    await dispatch({
      type: types.LOGIN_USER,
      payload: {
        admin: dataData.admin,
        userEmail: currentUser.email,
        userId: currentUser.uid,
        userName: dataData.userName,
        userPhone: dataData.userPhone,
        userAdress: dataData.userAdress,
        buyer: dataData.buyer,
      },
    });
  } catch (error) {
    setError(false);
    setErrorId("Введите правильный email и пароль");
  }
};
export const logoutUser = (param) => async (dispatch) => {
  await dispatch({ type: types.USER_SIGNOUT, payload: {} });
};
