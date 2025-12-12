"use client";

import { sessionQueryKey } from "@auth/hooks/use-session-query";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useInvalidateSession = () => {
	const queryClient = useQueryClient();

	const invalidateSession = useCallback(() => {
		queryClient.invalidateQueries({ queryKey: sessionQueryKey });
	}, [queryClient]);

	return { invalidateSession };
};
