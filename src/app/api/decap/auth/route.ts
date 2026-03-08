import { NextResponse } from "next/server";

const stateCookieName = "decap_oauth_state";

function getGithubClientId() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    throw new Error("Missing GITHUB_OAUTH_CLIENT_ID.");
  }

  return clientId;
}

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  try {
    const clientId = getGithubClientId();
    const state = crypto.randomUUID();
    const callbackUrl = new URL("/api/decap/callback", requestUrl.origin);
    const authorizeUrl = new URL("https://github.com/login/oauth/authorize");

    authorizeUrl.searchParams.set("client_id", clientId);
    authorizeUrl.searchParams.set("redirect_uri", callbackUrl.toString());
    authorizeUrl.searchParams.set("scope", "repo");
    authorizeUrl.searchParams.set("state", state);
    authorizeUrl.searchParams.set("allow_signup", "false");

    const response = NextResponse.redirect(authorizeUrl);

    response.cookies.set({
      name: stateCookieName,
      value: state,
      httpOnly: true,
      sameSite: "lax",
      secure: requestUrl.protocol === "https:",
      path: "/",
      maxAge: 60 * 10,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "GitHub OAuth could not be started.",
      },
      { status: 500 },
    );
  }
}
