import {
	useMutation,
	useQuery,
	UseQueryOptions,
	UseMutationOptions,
} from '@tanstack/react-query';
import { resourceService } from './';

type QueryOptions = Omit<
	UseQueryOptions<IResource, Error>,
	'queryKey' | 'queryFn'
>;

type MutationOptions = Omit<
	UseMutationOptions<IResource, Error, IUpdateResource>,
	'mutationKey' | 'mutationFn'
>;

export const useGetAllResources = (queryOptions?: QueryOptions) => {
	return useQuery({
		queryKey: ['resources'],
		queryFn: resourceService.getAll,
		...queryOptions,
	});
};

export const useGetSingleResource = (
	resourceID: number,
	queryOptions?: QueryOptions,
) => {
	return useQuery({
		queryKey: ['resources', 'resource', resourceID],
		queryFn: () => resourceService.getSingle(resourceID),
		...queryOptions,
	});
};

export const useCreateResource = (mutationOptions?: MutationOptions) => {
	return useMutation({
		mutationKey: ['resource', 'update'],
		mutationFn: data => resourceService.create(data),
		...mutationOptions,
	});
};

export const useUpdateResource = (mutationOptions?: MutationOptions) => {
	return useMutation({
		mutationKey: ['resource', 'update'],
		mutationFn: data => resourceService.patch(data),
		...mutationOptions,
	});
};

export const useDeleteResource = (mutationOptions?: MutationOptions) => {
	return useMutation({
		mutationKey: ['resource', 'delete'],
		mutationFn: (resourceID: number) =>
			resourceService.deleteSingle(resourceID),
		...mutationOptions,
	});
};
