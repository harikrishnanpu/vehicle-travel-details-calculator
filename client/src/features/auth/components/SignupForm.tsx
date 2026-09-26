import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../lib/api";
import { getFieldError } from "../../../lib/zod-field-error";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { signupSchema } from "../signup.schema";
import { useAuth } from "../useAuth";

export function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");

    const parsed = signupSchema.safeParse({
      name,
      email,
      password,
    });

    if (!parsed.success) {
      setNameError(getFieldError(parsed.error, "name"));
      setEmailError(getFieldError(parsed.error, "email"));
      setPasswordError(getFieldError(parsed.error, "password"));
      return;
    }

    setIsSubmitting(true);

    try {
      await signup(parsed.data);
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
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          error={nameError}
          onChange={(event) => setName(event.target.value)}
        />

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
          autoComplete="new-password"
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
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-teal-700 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
