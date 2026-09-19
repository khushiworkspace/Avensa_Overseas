/**
 * adminFetch — wrapper around fetch that automatically attaches
 * the admin JWT from localStorage as a Bearer token.
 *
 * Use this in all admin dashboard client components instead of
 * plain `fetch()` for admin API calls.
 *
 * Example:
 *   const res = await adminFetch("/api/admin/leads?page=1");
 *   const res = await adminFetch("/api/admin/leads/123", {
 *     method: "PATCH",
 *     body: JSON.stringify({ status: "CONTACTED" }),
 *   });
 */
export async function adminFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, { ...options, headers });

  /* If 401, token expired — redirect to login */
  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  }

  return res;
}
