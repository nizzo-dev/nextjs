"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
} from "@/components/ui";
import { ROUTES } from "@/lib/constants";
import { isValidEmail } from "@/lib/validations";
import { post, ApiError } from "@/lib/api";
import { ApiResponse, LoginResponse } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "请输入邮箱";
    } else if (!isValidEmail(email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }

    if (!password) {
      newErrors.password = "请输入密码";
    } else if (password.length < 6) {
      newErrors.password = "密码长度至少为 6 位";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await post<ApiResponse<LoginResponse>>(
        "/auth/login",
        {
          email,
          password,
        }
      );

      if (response.success && response.data) {
        // 保存 token 到 localStorage（实际项目中可能需要更安全的存储方式）
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // 跳转到首页
        router.push(ROUTES.home);
        router.refresh();
      } else {
        setErrors({
          general: response.message || "登录失败，请重试",
        });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors({
          general: error.message || "登录失败，请重试",
        });
      } else {
        setErrors({
          general: "网络错误，请检查网络连接后重试",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold">登录</CardTitle>
              <CardDescription>
                请输入您的邮箱和密码以登录账户
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-400">
                    {errors.general}
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    邮箱
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({ ...errors, email: undefined });
                      }
                    }}
                    disabled={isLoading}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    密码
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors({ ...errors, password: undefined });
                      }
                    }}
                    disabled={isLoading}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? "登录中..." : "登录"}
                  </Button>
                </div>

                <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                  <p>
                    演示账户：{" "}
                    <span className="font-mono text-xs">
                      demo@example.com / 123456
                    </span>
                  </p>
                </div>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link
                  href={ROUTES.home}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
                >
                  返回首页
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </MainLayout>
  );
}

