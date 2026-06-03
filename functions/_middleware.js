function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Portfolio"',
      "Cache-Control": "no-store",
    },
  });
}

function decodeCredentials(header) {
  if (!header || !header.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");

    if (separator === -1) {
      return null;
    }

    return {
      user: decoded.slice(0, separator),
      pass: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export async function onRequest({ request, env, next }) {
  const user = env.PORTFOLIO_USER;
  const pass = env.PORTFOLIO_PASSWORD;

  if (!user || !pass) {
    return new Response("Portfolio password is not configured.", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const credentials = decodeCredentials(request.headers.get("Authorization"));

  if (!credentials || credentials.user !== user || credentials.pass !== pass) {
    return unauthorized();
  }

  const response = await next();
  const protectedResponse = new Response(response.body, response);

  protectedResponse.headers.set("Cache-Control", "private, no-store");
  protectedResponse.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return protectedResponse;
}
