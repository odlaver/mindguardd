export function getRoleHomePath(role?: string | null) {
  if (role === "admin") {
    return "/admin";
  }

  if (role === "counselor") {
    return "/counselor";
  }

  return "/student";
}
