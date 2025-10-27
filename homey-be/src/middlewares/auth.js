import jwtLib from "jsonwebtoken";

// Middleware xác thực người dùng qua JWT
export function jwtVerify(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Bạn chưa đăng nhập" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwtLib.verify(token, process.env.JWT_SECRET || "mysecret");

    req.user = decoded; // { id, role, ... }
    next();
  } catch (err) {
    console.error("JWT Verify error:", err.message);
    return res.status(403).json({ error: "Token không hợp lệ hoặc đã hết hạn" });
  }
}

// Giữ tên export cũ để không ảnh hưởng code khác
export const jwtMiddleware = () => jwtVerify;

export const jwt = jwtMiddleware;
