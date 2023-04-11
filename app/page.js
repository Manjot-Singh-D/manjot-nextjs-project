"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  // const [router, setRouter] = useState(() => useRouter());
  const router = useMemo(() => useRouter());

  useEffect(() => {
    router.push("/login");
  }, []);
  return <div></div>;
};

export default Page;
