import { EntityRepository, Repository } from 'typeorm';
import { Measurement } from './measurement.entity';

@EntityRepository(Measurement)
export class MeasurementRepository extends Repository<Measurement> {
    // Aqui você pode adicionar métodos personalizados para consultas mais complexas
}
