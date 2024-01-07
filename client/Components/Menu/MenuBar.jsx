import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { IoMdDownload } from "react-icons/io";
import { IoIosUndo } from "react-icons/io";
import { IoIosRedo } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import "./index.scss";

export const MenuBar = ({ undo, redo, clearAll, downloadImage }) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");
  return (
    <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
      <Toolbar.Button className="ToolbarButton" onClick={undo}>
        <IoIosUndo size={20} />
      </Toolbar.Button>
      <Toolbar.Button className="ToolbarButton" onClick={redo}>
        <IoIosRedo size={20} />
      </Toolbar.Button>
      <Toolbar.Button className="ToolbarButton" onClick={clearAll}>
        <MdDelete size={20} />
      </Toolbar.Button>
      <Toolbar.Button className="ToolbarButton" onClick={downloadImage}>
        <IoMdDownload size={22} />
      </Toolbar.Button>

      <Toolbar.Separator className="ToolbarSeparator" />
      <div style={{ display: "flex", gap: 20 }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Avatar.Root className="AvatarRoot">
              <Avatar.Fallback className="AvatarFallback">PD</Avatar.Fallback>

              <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                CT
              </Avatar.Fallback>
            </Avatar.Root>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="DropdownMenuContent"
              sideOffset={5}
            >
              <DropdownMenu.Item className="DropdownMenuItem" disabled>
                About user
              </DropdownMenu.Item>
              {/* <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                  User info
                  <div className="RightSlot">
                    <ChevronRightIcon />
                  </div>
                </DropdownMenu.SubTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.SubContent
                    className="DropdownMenuSubContent"
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Save Page As… <div className="RightSlot">⌘+S</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Create Shortcut…
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Name Window…
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="DropdownMenu.Separator" />
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Developer Tools
                    </DropdownMenu.Item>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Portal>
              </DropdownMenu.Sub> */}

              <DropdownMenu.Separator className="DropdownMenuSeparator" />

              {/* <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={bookmarksChecked}
                onCheckedChange={setBookmarksChecked}
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
                Show Bookmarks <div className="RightSlot">⌘+B</div>
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem
                className="DropdownMenuCheckboxItem"
                checked={urlsChecked}
                onCheckedChange={setUrlsChecked}
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
                Show Full URLs
              </DropdownMenu.CheckboxItem>

              <DropdownMenu.Separator className="DropdownMenuSeparator" />

              <DropdownMenu.Label className="DropdownMenuLabel">
                People
              </DropdownMenu.Label>
              <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="pedro"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <DotFilledIcon />
                  </DropdownMenu.ItemIndicator>
                  Pedro Duarte
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem
                  className="DropdownMenuRadioItem"
                  value="colm"
                >
                  <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                    <DotFilledIcon />
                  </DropdownMenu.ItemIndicator>
                  Colm Tuite
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup> */}

              <DropdownMenu.Arrow className="DropdownMenuArrow" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <Toolbar.Separator className="ToolbarSeparator" />
      <Toolbar.Button className="ToolbarButton">Share</Toolbar.Button>
    </Toolbar.Root>
  );
};
