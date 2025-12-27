import bcrypt from 'bcrypt' 
import User from '../models/User.js'

export const register = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    const existingUser = await User.findOne({ $or: [{username}, {email}] });
    if (existingUser) {
      return res.status(400).json({ message: "Username hoặc Email đã tồn tại." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      displayName: `${firstName} ${lastName}`,
    });

    return res.status(201).json({ message: "Đăng ký thành công!", userId: newUser._id });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server." });
  }
};

