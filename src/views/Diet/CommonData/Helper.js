import { useQuery } from "@tanstack/react-query";

export const useSafeQuery = ({
    queryKey = [],
    queryFn,
    enabled = true,
    staleTime = 1000 * 60 * 5,
    defaultValue = [],
    retry = 1,
    select,
    ...rest
}) => {

    return useQuery({
        queryKey,
        enabled,
        staleTime,
        retry,
        throwOnError: false,
        queryFn: async () => {
            try {
                const response = await queryFn();
                return response ?? defaultValue;
            } catch (error) {
                console.error(
                    `ReactQuery Error (${queryKey?.join("-")})`,
                    error
                );
                return defaultValue;
            }
        },
        select: (data) => {
            try {
                if (typeof select === "function") {
                    return select(data);
                }
                return data ?? defaultValue;
            } catch (error) {
                console.error(
                    `ReactQuery Select Error (${queryKey?.join("-")})`,
                    error
                );
                return defaultValue;
            }
        },

        ...rest
    });
};