"use client";
import React, { Suspense } from "react";
import EditComponent from "../Components/Edit";
const Editpage = () => {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
    <EditComponent/>
    </Suspense>
    </div>
  )
};

export default Editpage;
