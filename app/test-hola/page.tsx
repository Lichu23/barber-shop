"use client"
import { useUser } from '@clerk/nextjs';

export default function TestUser() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <p>Loading Clerk...</p>;
  if (!isSignedIn) return <p>User not signed in</p>;

  return <p>User ID: {user?.id}</p>;
}
