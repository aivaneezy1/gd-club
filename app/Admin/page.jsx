"use client";
import React, { Suspense } from "react";
import AdminComponent from "../Components/Admin";

const Adminpage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminComponent />
      </Suspense>
    </div>
  );
};

export default Adminpage;
