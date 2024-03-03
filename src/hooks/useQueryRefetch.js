import { useQueryClient } from "@tanstack/react-query";

const useQueryRefetch = async (queryKey) => {
  const queryClient = useQueryClient();
  await queryClient.invalidateQueries({
    queryKey: [`${queryKey}`],
    exact: true,
  });
};

export { useQueryRefetch };
