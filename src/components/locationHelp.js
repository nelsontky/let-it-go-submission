import React from "react"
import HelpButton from "./helpButton"

const content = (
  <div style={{ textAlign: "left" }}>
    Check that you have:
    <ul>
      <li>
        Enabled your device's GPS settings
        <ul>
          <li>
            <a
              style={{
                textShadow: "none",
              }}
              href="https://support.google.com/accounts/answer/3467281"
              rel="noopener noreferrer"
              target="_blank"
            >
              Android
            </a>
          </li>
          <li>
            <a
              style={{ textShadow: "none" }}
              href="https://support.apple.com/en-us/HT207092"
              rel="noopener noreferrer"
              target="_blank"
            >
              iOS
            </a>
          </li>
          <li>Reload this page after enabling GPS settings</li>
        </ul>
      </li>
      <li>
        Allowed your browser and this website the neccessary permissions to read
        your location
        <ul>
          <li>Press allow when a similar prompt as below appears</li>
          <li>If such a prompt does not appear, reload the page</li>
        </ul>
      </li>
    </ul>
    <img
      src="https://raw.githubusercontent.com/nelsontky/let-it-go/master/assets/misc/locationHelp.png"
      alt=""
    />
  </div>
)

export default () => (
  <p>
    Location loading/not available<HelpButton content={content} />
  </p>
)
