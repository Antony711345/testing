import { useAxios } from './axios.hooks';
import { useMemo } from "react";
import { UserService } from './user/user-services';

const SERVICES = {
    user: UserService,
};

type ServiceMap = typeof SERVICES;

/**
 * Returns a service instance
 * @param name The name of the service
 * @returns The service instance
 */
export function useService<K extends keyof ServiceMap>(
  name: K
): InstanceType<ServiceMap[K]> {
  const agent = useAxios();
  return useMemo(() => {
    const Service = SERVICES[name];
    return new Service(agent) as InstanceType<ServiceMap[K]>;
  }, [agent, name]);
}

