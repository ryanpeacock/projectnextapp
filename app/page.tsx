import UsersTable from "./_components/UsersTable";
import { Suspense } from "react";
import { TableSkeleton } from "./_components/TableSkeleton";
import { formatUserDataFromServer } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function fetchData() {
  const response = await fetch("https://randomuser.me/api/?results=10");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function Home() {
  const data = await fetchData();
  const formattedData = formatUserDataFromServer(data.results);

  return (
    <div>
      <Link href="/add-user">
        <Button className="block my-10 w-1/4 mx-auto">Add User</Button>
      </Link>

      <Suspense fallback={<TableSkeleton />}>
        <UsersTable users={formattedData} />
      </Suspense>
    </div>
  );
}
