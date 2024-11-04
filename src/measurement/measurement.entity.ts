import { User } from 'src/auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('measurements')
export class Measurement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room: string;

    @Column()
    signalStrength2_4GHz: number;

    @Column()
    signalStrength5GHz: number;

    @Column()
    speed2_4GHz: number;

    @Column()
    speed5GHz: number;

    @Column()
    interference: number;

    @ManyToOne(() => User, user => user.measurements, { onDelete: 'CASCADE' })
    user: User;
}
