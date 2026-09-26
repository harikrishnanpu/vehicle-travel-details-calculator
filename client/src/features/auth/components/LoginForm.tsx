import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../lib/api";
import { getFieldError } from "../../../lib/zod-field-error";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { loginSchema } from "../login.schema";
import { useAuth } from "../useAuth";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    const parsed = loginSchema.safeParse({
      email,
      password,
    });

    if (!parsed.success) {
      setEmailError(getFieldError(parsed.error, "email"));
      setPasswordError(getFieldError(parsed.error, "password"));
      return;
    }

    setIsSubmitting(true);

    try {
      await login(parsed.data);
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="text"
          autoComplete="email"
          value={email}
          error={emailError}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          error={passwordError}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-slate-600">
        No account yet?{" "}
        <Link to="/signup" className="font-medium text-teal-700 hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
