export class UpdateMeasurementDto {
    readonly room?: string;
    readonly signalStrength2_4GHz?: number;
    readonly signalStrength5GHz?: number;
    readonly speed2_4GHz?: number;
    readonly speed5GHz?: number;
    readonly interference?: number;
}
