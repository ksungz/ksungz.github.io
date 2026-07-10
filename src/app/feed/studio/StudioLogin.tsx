"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, LockKeyhole, LogIn } from "lucide-react";

interface StudioLoginProps {
  configured: boolean;
}

export function StudioLogin({ configured }: StudioLoginProps) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/feed-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        setError(response.status === 503 ? "관리자 인증이 구성되지 않았습니다." : "인증에 실패했습니다.");
        return;
      }

      window.location.reload();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="studio-login-shell">
      <form className="studio-login" onSubmit={handleSubmit}>
        <LockKeyhole aria-hidden="true" size={24} />
        <h1>Feed Studio</h1>
        <label htmlFor="feed-admin-token">관리 토큰</label>
        <input
          id="feed-admin-token"
          type="password"
          autoComplete="current-password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          disabled={!configured || loading}
          required
        />
        <button type="submit" disabled={!configured || loading || token.length === 0}>
          {loading ? (
            <LoaderCircle className="spin" aria-hidden="true" size={16} />
          ) : (
            <LogIn aria-hidden="true" size={16} />
          )}
          로그인
        </button>
        {!configured && <p>관리자 인증이 아직 구성되지 않았습니다.</p>}
        {error && <p role="alert">{error}</p>}
      </form>
    </main>
  );
}
