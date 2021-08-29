import DataLoader from 'dataloader';
import { Service } from '../../entity/Service';

export const createServiceLoader = () =>
  new DataLoader<number, Service>(async (serviceIds) => {
    const services = await Service.findByIds(serviceIds as number[]);

    const serviceIdToService: Record<number, Service> = {};

    services.forEach((u) => {
      serviceIdToService[u.id] = u;
    });

    const sortedServices = serviceIds.map((serviceId) => serviceIdToService[serviceId]);

    return sortedServices;
  });
