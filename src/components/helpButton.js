import React from "react"
import Tippy from "@tippy.js/react"

const HelpButton = props => (
  <Tippy
    content={props.content}
    arrow={true}
    trigger="click"
    placement="bottom"
    interactive={true}
  >
    <img
      style={{ verticalAlign: "middle" }}
      src="https://material.io/tools/icons/static/icons/baseline-help_outline-24px.svg"
      alt=""
    />
  </Tippy>
)

export default HelpButton
