import "cross-fetch/polyfill";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import jwt_decode from "jwt-decode";

declare var process: {
  env: {
    REACT_APP_C_USER_POOL_ID: string;
    REACT_APP_C_CLIENT_ID: string;
    REACT_APP_T_USER_POOL_ID: string;
    REACT_APP_T_CLIENT_ID: string;
  };
};

const c_user_pool_id = process.env.REACT_APP_C_USER_POOL_ID;
const c_client_id = process.env.REACT_APP_C_CLIENT_ID;

const t_user_pool_id = process.env.REACT_APP_T_USER_POOL_ID;
const t_client_id = process.env.REACT_APP_T_CLIENT_ID;

const clientUserPool = new CognitoUserPool({
  UserPoolId: c_user_pool_id,
  ClientId: c_client_id,
});

const talentUserPool = new CognitoUserPool({
  UserPoolId: t_user_pool_id,
  ClientId: t_client_id,
});

export const isClient = () => {
  const isClient = localStorage.getItem("client");
  return isClient === "true";
};

export const signUp = (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  return new Promise((resolve, reject) => {
    let attributeList = [
      new CognitoUserAttribute({
        Name: "given_name",
        Value: firstName,
      }),
      new CognitoUserAttribute({
        Name: "family_name",
        Value: lastName,
      }),
    ];

    const userPool = isClient() ? clientUserPool : talentUserPool;

    return userPool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

export const signIn = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userPool = isClient() ? clientUserPool : talentUserPool;

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const getUserAttributes = () => {
  return new Promise((resolve, reject) => {
    const userPool = isClient() ? clientUserPool : talentUserPool;
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(() => {});
      cognitoUser.getUserAttributes((err: any, attributes: any) => {
        if (err) {
          return reject(err);
        }
        let userAttributes: { [key: string]: string } = {};
        attributes?.map((attribute: CognitoUserAttribute) => {
          userAttributes[attribute.Name] = attribute.Value;
        });
        return resolve(userAttributes);
      });
    }
  });
};

export const updateUserAttributes = (data: { [key: string]: string }) => {
  return new Promise((resolve, reject) => {
    const attributeList = Object.entries(data).map(
      (d: [string, string]) =>
        new CognitoUserAttribute({
          Name: d[0],
          Value: d[1],
        }),
    );

    const userPool = isClient() ? clientUserPool : talentUserPool;

    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(() => {});
      cognitoUser.updateAttributes(attributeList, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    }
  });
};

export const changePassword = (currentPassword: string, newPassword: string) => {
  return new Promise((resolve, reject) => {
    const userPool = isClient() ? clientUserPool : talentUserPool;
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(() => {});
      cognitoUser.changePassword(currentPassword, newPassword, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    }
  });
};

export const getIdToken = () => {
  const userPool = isClient() ? clientUserPool : talentUserPool;
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    return cognitoUser.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err) {
        return false;
      }
      if (session.isValid()) {
        return session.getIdToken().getJwtToken();
      } else {
        return false;
      }
    });
  }
  return false;
};

export const getRefreshToken = () => {
  const userPool = isClient() ? clientUserPool : talentUserPool;
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    return cognitoUser.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err) {
        return false;
      }
      return session.getRefreshToken();
    });
  }
  return false;
};

export const refreshToken = async () => {
  const token = getRefreshToken();
  if (token) {
    const userPool = isClient() ? clientUserPool : talentUserPool;
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.refreshSession(token, (err, session) => {
        if (err) {
          return false;
        }
        return session;
      });
    }
  }
  return false;
};

export const isSessionValid = () => {
  const userPool = isClient() ? clientUserPool : talentUserPool;
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    return cognitoUser.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err) {
        return false;
      }
      const token = session.getIdToken().getJwtToken();
      const { exp }: { exp: Number } = jwt_decode(token);
      return exp > Date.now() / 1000;
    });
  }
  return false;
};

export const signOut = () => {
  const userPool = isClient() ? clientUserPool : talentUserPool;
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.getSession(() => {});
    cognitoUser.signOut();
    return true;
  }
  return false;
};

export const getUserDataFromToken = () => {
  const token = getIdToken();
  if (token) {
    const {
      sub: id,
      email,
      given_name: first_name,
      family_name: last_name,
    }: {
      sub: string;
      email: string;
      user_data: string;
      family_name: string;
      given_name: string;
    } = jwt_decode(token);

    return {
      id,
      email,
      first_name,
      last_name,
      ...JSON.parse("{}"),
    };
  }
  return {};
};
