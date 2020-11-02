import jwtDecode from "jwt-decode";
import { storage, utils, api } from "@mb";
class jwtService {
  signInWithEmailAndPassword = async (grNo, password) => {
    return new Promise((resolve, reject) => {
      const token = this.getAccessToken();
      const grNoFromToken = this.validateAuthToken(token);
      if (grNoFromToken === grNo) {
        let au = {
          token,
          basicProfile: this.getAuthUserInfo(),
        };
        this.setSession(token, storage.getObject("lastLoginAt"));
        resolve(au);
        return;
      } else {
        this.logout();
      }

      api.axios
        .post(`api/auth/login`, {
          Username: grNo,
          password,
        })
        .then((response) => {
          if (response.data && response.data.data && response.data.data.token) {
            this.setSession(
              response.data.data.token,
              response.data.data.lastLoginAt
            );
            this.setAuthUserInfo(response.data.data.basicProfile);
            resolve(response.data.data);
          } else {
            reject(response.data.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  verifyLoggedInUser = async () => {
    return new Promise((resolve, reject) => {
      if (this.validateUserAndAuthTokenLocally()) {
        resolve(this.getAuthUserInfo());
      } else {
        api.axios
          .post(`api/auth/verify`)
          .then((response) => {
            if (response.data) {
              const au = {
                ...response.data.data,
                lastLoginAt: storage.getObject("lastLoginAt"),
              };
              this.setAuthUserInfo(au);
              resolve(au);
            } else {
              reject(response.meta);
            }
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };
  signOut = async () => {
    //debugger
    return new Promise((resolve, reject) => {
      if (this.logout()) resolve(true);
      else reject(false);
    });
  };

  changePassword = async (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      api.axios
        .post(`api/auth/password/change`, { currentPassword, newPassword })
        .then((response) => {
          if (response.data) {
            resolve(response.data.data);
          } else {
            reject(response.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  forgotPassword = async (grNo, smsNumber) => {
    return new Promise((resolve, reject) => {
      api.axios
        .post(`api/auth/password/forget`, { grNo: Number(grNo), smsNumber })
        .then((response) => {
          if (response.data) {
            resolve(response.data.data);
          } else {
            reject(response.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      api.axios.post("api/auth/register", data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  registerOnline = (data) =>
    new Promise((resolve, reject) => {
      api.axios.post("api/OnlineRegistration", data).then((response) => {
        if (response.data) {
          resolve(response.data.data);
        } else {
          reject(response.data.error);
        }
      });
    });

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      api.axios
        .get("api/auth/access-token", {
          data: {
            token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.token);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  updateUserData = (user) => {
    return api.axios.post("api/auth/user/update", {
      user: user,
    });
  };

  setSession = (token, lastLoginAt) => {
    if (token) {
      storage.setObject("token", token);
      api.axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      storage.remove("token");
      delete api.axios.defaults.headers.common["Authorization"];
    }

    if (lastLoginAt) {
      storage.setObject("lastLoginAt", lastLoginAt);
    } else {
      storage.remove("lastLoginAt");
    }
  };

  setAuthUserInfo = (authUser) => {
    //debugger
    if (authUser) {
      storage.setObject("authUser", authUser);
      storage.setObject(
        "imageLink",
        `${process.env.REACT_APP_USER_IMG}${this.getAccessToken()}`
      );
    } else {
      storage.remove("authUser");
      storage.remove("imageLink");
    }
  };
  getAuthUserInfo = () => {
    return storage.getObject("authUser");
  };

  logout = () => {
    this.setSession(null);
    this.setAuthUserInfo(null);
    return true;
  };

  validateAuthToken = (token) => {
    if (!token || utils.isEmpty(token)) {
      return 0;
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      this.logout();
      console.warn("access token expired");
      return 0;
    } else {
      return decoded.unique_name; //grNo
    }
  };

  getAccessToken = () => {
    return storage.getObject("token");
  };

  validateUserAndAuthTokenLocally = () => {
    const grNo = this.validateAuthToken(this.getAccessToken());
    if (grNo === 0) return 0;
    const au = this.getAuthUserInfo();
    if (!au || utils.isEmpty(au)) {
      return 0;
    }
    // eslint-disable-next-line eqeqeq
    return grNo == au.grNo;
  };

  signInAdminForUser = async (authToken) => {
    return new Promise((resolve, reject) => {
      this.logout();

      api.axios
        .post(`api/auth/LoginAdminForUser`, {
          authToken,
        })
        .then((response) => {
          //console.log(response);
          if (response.data) {
            this.setSession(
              response.data.data.token,
              response.data.data.lastLoginAt
            );
            this.setAuthUserInfo(response.data.data.basicProfile);
            resolve(response.data.data);
          } else {
            reject(response.data.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  welcome = async (query) => {
    return new Promise((resolve, reject) => {
      this.logout();

      api.axios
        .post(`api/auth/welcome`, {
          grNo: Number(query.grNo),
        })
        .then((response) => {
          console.log(response);
          if (response.data) {
            resolve(response.data.data);
          } else {
            reject(response.data.meta);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

const instance = new jwtService();

export default instance;
