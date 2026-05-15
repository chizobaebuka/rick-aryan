'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiEnvelope, UserPublic } from '@/types/api.types';

export default function UsersPage() {
  const { data, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data: env } = await api.get<ApiEnvelope<UserPublic[]>>('/users');
      return env.data;
    },
  });

  return (
    <div>
      <p className="mb-4 text-xs text-muted">Master admin only — user directory</p>
      {isError && <p className="text-xs text-red-300">Unable to load users.</p>}
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 text-muted">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((u) => (
              <tr key={u.id} className="border-b border-white/5">
                <td className="p-3">{u.fullName}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 font-label text-[10px]">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
