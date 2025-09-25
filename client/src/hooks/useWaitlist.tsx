import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { WaitlistEntry } from '@shared/schema';

interface WaitlistCountResponse {
  count: number;
}

interface WaitlistStatusResponse {
  hasJoined: boolean;
  entry: WaitlistEntry | null;
}

interface JoinWaitlistRequest {
  note?: string;
}

interface JoinWaitlistResponse {
  success: boolean;
  entry: WaitlistEntry;
  message: string;
}

export function useWaitlistCount() {
  return useQuery<WaitlistCountResponse>({
    queryKey: ['/api/waitlist/count'],
    refetchInterval: 30000, // Refresh every 30 seconds to show live count
  });
}

export function useWaitlistStatus() {
  return useQuery<WaitlistStatusResponse>({
    queryKey: ['/api/waitlist/status'],
    retry: false, // Don't retry if user is not authenticated
  });
}

export function useJoinWaitlist() {
  const queryClient = useQueryClient();
  
  return useMutation<JoinWaitlistResponse, Error, JoinWaitlistRequest>({
    mutationFn: async (data: JoinWaitlistRequest) => {
      const response = await apiRequest('POST', '/api/waitlist/join', data);
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch waitlist-related queries
      queryClient.invalidateQueries({ queryKey: ['/api/waitlist/count'] });
      queryClient.invalidateQueries({ queryKey: ['/api/waitlist/status'] });
    },
  });
}