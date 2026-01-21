import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, LoginRequest, LoginResponse, User } from "@/types";
import { findUserByEmail } from "@/lib/db";

/**
 * 登录 API 路由
 * POST /api/auth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // 验证输入
    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "邮箱和密码不能为空",
        },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "邮箱格式不正确",
        },
        { status: 400 }
      );
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "密码长度至少为 6 位",
        },
        { status: 400 }
      );
    }

    // 从数据库查询用户
    const dbUser = await findUserByEmail(email);

    if (!dbUser) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "邮箱或密码错误",
        },
        { status: 401 }
      );
    }

    // TODO: 使用 bcrypt 验证密码
    // 安装: npm install bcryptjs @types/bcryptjs
    // import bcrypt from 'bcryptjs';
    // const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    
    // 当前使用简单比较（仅用于演示）
    // 在生产环境中，必须使用 bcrypt 验证密码哈希
    const isPasswordValid = dbUser.password === password;

    if (!isPasswordValid) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "邮箱或密码错误",
        },
        { status: 401 }
      );
    }

    // TODO: 生成 JWT token
    // 安装: npm install jsonwebtoken @types/jsonwebtoken
    // import jwt from 'jsonwebtoken';
    // const token = jwt.sign(
    //   { userId: dbUser.id, email: dbUser.email },
    //   process.env.JWT_SECRET!,
    //   { expiresIn: '7d' }
    // );
    
    // 当前使用模拟 token（仅用于演示）
    const token = `mock-jwt-token-${Date.now()}`;

    // 构建用户响应对象（不包含密码）
    const user: User = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      avatar: dbUser.avatar,
      createdAt: dbUser.createdAt,
      updatedAt: dbUser.updatedAt,
    };

    const loginResponse: LoginResponse = {
      user,
      token,
    };

    return NextResponse.json<ApiResponse<LoginResponse>>(
      {
        success: true,
        data: loginResponse,
        message: "登录成功",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "服务器错误，请稍后重试",
      },
      { status: 500 }
    );
  }
}

