import { getTokenUrl } from "frames.js";
import { zora } from "viem/chains";
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "../../debug";
import { currentURL } from "../../utils";
/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";

import { createFrames } from "frames.js/next";

// @todo here is issue with exporting, ts2742, how to fix it?
export const frames = createFrames({
  basePath: "/examples/new-api-only-followers-can-mint/frames",
  initialState: { page: "initial" },
});

const handleRequest = frames(async ({ pressedButton, message, state }) => {
  if (state.page === "initial")
    return {
      image: (
        <span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            You can mint if you follow the caster.
          </div>
        </span>
      ),
      buttons: [
        <Button action="post" state={{ page: "result" }}>
          Am I?
        </Button>,
      ],
    };
  return {
    image: (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {message?.requesterFollowsCaster
          ? "You are following the caster."
          : "You are not following the caster"}
      </div>
    ),
    buttons: [
      <Button action="post" state={{ page: "result" }}>
        Check again
      </Button>,
      message?.requesterFollowsCaster ? (
        <Button
          action="mint"
          key="mint-button"
          target={getTokenUrl({
            address: "0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df",
            chain: zora,
            tokenId: "1",
          })}
        >
          Mint
        </Button>
      ) : null,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
