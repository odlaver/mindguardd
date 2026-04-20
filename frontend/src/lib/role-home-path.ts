export function getRoleHomePath(role?: string | null) {
  if (role === "admin") {
    return "/admin";
  }

  if (role === "counselor" || role === "homeroom") {
    return "/counselor";
  }

  return "/student";
}
