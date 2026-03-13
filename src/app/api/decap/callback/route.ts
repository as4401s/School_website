import { NextResponse } from "next/server";

const stateCookieName = "decap_oauth_state";

function getGithubCredentials() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing GitHub OAuth credentials.");
  }

  return {
    clientId,
    clientSecret,
  };
}

function renderPopupResponse(
  type: "success" | "error",
  payload: Record<string, unknown> | string,
  targetOrigin: string,
) {
  const message =
    type === "success"
      ? `authorization:github:success:${JSON.stringify(payload)}`
      : `authorization:github:error:${String(payload)}`;

  const title =
    type === "success" ? "GitHub authorization complete" : "GitHub authorization failed";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #f7f1e8;
        color: #152033;
        font-family: "Helvetica Neue", Arial, sans-serif;
      }

      .card {
        width: min(420px, calc(100% - 32px));
        padding: 28px;
        border-radius: 22px;
        background: #fffaf4;
        box-shadow: 0 24px 72px rgba(21, 32, 51, 0.14);
        text-align: center;
      }

      h1 {
        margin: 0 0 12px;
        font-size: 1.6rem;
      }

      p {
        margin: 0;
        line-height: 1.6;
        color: rgba(21, 32, 51, 0.74);
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${title}</h1>
      <p>You can close this window if nothing happens automatically.</p>
    </div>
    <script>
      (function () {
        var message = ${JSON.stringify(message)};
        var targetOrigin = ${JSON.stringify(targetOrigin)};

        function finish(targetOrigin) {
          if (!window.opener) {
            return;
          }

          window.opener.postMessage(message, targetOrigin);
          window.close();
        }

        if (window.opener) {
          window.opener.postMessage("authorizing:github", targetOrigin);
          setTimeout(function () {
            finish(targetOrigin);
          }, 800);
        }
      })();
    </script>
  </body>
</html>`;
}

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const responseHeaders = {
    "Content-Type": "text/html; charset=utf-8",
  };

  try {
    const { clientId, clientSecret } = getGithubCredentials();
    const code = requestUrl.searchParams.get("code");
    const returnedState = requestUrl.searchParams.get("state");
    const error = requestUrl.searchParams.get("error");

    if (error) {
      return new NextResponse(renderPopupResponse("error", error, requestUrl.origin), {
        headers: responseHeaders,
      });
    }

    if (!code || !returnedState) {
      return new NextResponse(
        renderPopupResponse("error", "Missing GitHub response parameters.", requestUrl.origin),
        {
          headers: responseHeaders,
        },
      );
    }

    const cookieHeader = request.headers.get("cookie") || "";
    const cookieStateValue = cookieHeader
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${stateCookieName}=`))
      ?.split("=")
      .slice(1)
      .join("=");

    if (!cookieStateValue || cookieStateValue !== returnedState) {
      return new NextResponse(renderPopupResponse("error", "State validation failed.", requestUrl.origin), {
        headers: responseHeaders,
      });
    }

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        state: returnedState,
        redirect_uri: new URL("/api/decap/callback", requestUrl.origin).toString(),
      }),
      cache: "no-store",
    });

    const tokenPayload = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (!tokenResponse.ok || tokenPayload.error || !tokenPayload.access_token) {
      throw new Error(
        tokenPayload.error_description ||
          tokenPayload.error ||
          "GitHub did not return an access token.",
      );
    }

    const response = new NextResponse(
      renderPopupResponse("success", {
        token: tokenPayload.access_token,
        provider: "github",
      }, requestUrl.origin),
      {
        headers: responseHeaders,
      },
    );

    response.cookies.set({
      name: stateCookieName,
      value: "",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    const response = new NextResponse(
      renderPopupResponse(
        "error",
        error instanceof Error ? error.message : "GitHub authorization failed.",
        requestUrl.origin,
      ),
      {
        headers: responseHeaders,
      },
    );

    response.cookies.set({
      name: stateCookieName,
      value: "",
      path: "/",
      maxAge: 0,
    });

    return response;
  }
}
