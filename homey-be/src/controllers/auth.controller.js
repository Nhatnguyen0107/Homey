import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";
import jwtConfig from "../config/jwt.config.js";
import BaseController from "./base.controller.js";
import { getExpiresAtFromToken } from "../helpers/jwt.js";

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = new UserService();
  }

  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      const isUserExisted = !!(await this.service.getUserByEmail(email));
      if (isUserExisted) {
        return res.status(400).json({ message: "User exists" });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = { name, email, passwordHash };
      await this.service.createUser(newUser);
      res.json({ message: "User created" });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async signin(req, res) {
    try {
      const { email, password, isRemember } = req.body;
      const user = await this.service.getUserByEmail(email, true);
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid)
        return res.status(400).json({ message: "Invalid credentials" });

      const { accessToken, refreshToken } = await this._generateTokens(
        user.id,
        !isRemember
      );
      this._setTokensAsCookies(res, accessToken, refreshToken);
      res.json({ accessToken, refreshToken }); // also send in JSON for API clients
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async refresh(req, res) {
    try {
      const token = req.cookies.refreshToken || req.body.refreshToken;
      if (!token)
        return res.status(401).json({ message: "Missing refresh token" });

      jwt.verify(token, jwtConfig.JWT_REFRESH_SECRET, async (err, payload) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });

        const user = await this.service.getUserById(payload.sub, true);
        if (user?.RefreshToken?.token !== token)
          return res.status(403).json({ message: "Refresh token revoked" });

        const { accessToken, refreshToken } = await this._generateTokens(
          payload.sub,
          true
        );
        this._setTokensAsCookies(res, accessToken, refreshToken);
        res.json({ accessToken, refreshToken });
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async signout(req, res) {
    try {
      const userId = req.user?.id;
      if (userId) {
        await this.service.updateUser(userId, { refreshToken: null }, true);
      }
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.json({ message: "Signed out" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProfile(req, res) {
    try {
      res.json(req.user);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // ===== HELPER FUNCTIONS =====
  async _generateTokens(userId, accessTokenOnly = false) {
    const accessToken = jwt.sign({ sub: userId }, jwtConfig.JWT_SECRET, {
      expiresIn: jwtConfig.JWT_EXPIRES_IN,
    });

    if (!accessTokenOnly) {
      const refreshToken = jwt.sign(
        { sub: userId },
        jwtConfig.JWT_REFRESH_SECRET,
        {
          expiresIn: jwtConfig.JWT_REFRESH_EXPIRES_IN,
        }
      );
      await this.service.updateUser(userId, { refreshToken }, true);
      return { accessToken, refreshToken };
    }
    return { accessToken };
  }

  _setTokensAsCookies(res, accessToken, refreshToken) {
    if (accessToken) {
      res.cookie("accessToken", accessToken, {
        httpOnly: true, // set = false if want access from browser
        sameSite: "strict",
        secure: false,
        expires: getExpiresAtFromToken(accessToken),
      });
    }

    if (refreshToken) {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // set = false if want access from browser
        sameSite: "strict",
        secure: false,
        expires: getExpiresAtFromToken(refreshToken),
      });
    }
  }
}

export default AuthController;
