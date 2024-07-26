"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function BasicMenu() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-8 h-8"
        >
          <path
            fill="#ffffff"
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          {" "}
          <button
            onClick={() => router.push("/About")}
            className="cursor-pointer"
          >
            About
          </button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <button
            onClick={() => router.push("/Media")}
            className="cursor-pointer"
          >
            Media
          </button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <button
            onClick={() => router.push("/Contact")}
            className="cursor-pointer"
          >
            Contact
          </button>
        </MenuItem>
        {session?.user.role === "admin" && status == "authenticated" && (
          <MenuItem onClick={handleClose}>
            <Link href="/Admin">Admin</Link>
          </MenuItem>
        )}

         {session?.user.role === "admin" && status == "authenticated" ? (
            <MenuItem onClick={handleClose}>
          <Link href="/api/auth/signin">Logout</Link>
        </MenuItem>
        ) : (
           <MenuItem onClick={handleClose}>
          <Link href="/api/auth/signin">Login</Link>
        </MenuItem>
        )}
       
      </Menu>
    </div>
  );
}
