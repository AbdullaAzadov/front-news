'use client';
import { ROUTES } from '@/app/routes/routes';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(ROUTES.MAIN);
}
